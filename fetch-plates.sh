#!/usr/bin/env bash
# fetch-plates.sh — pulls the public-domain plates for the mini-series into assets/plates/
# Run from the repo root on a machine with open internet:  bash fetch-plates.sh
# Sources: Library of Congress (JSON API, picks the largest JPEG) and Wikimedia Commons (API, records the license).
# Writes assets/plates/<key>.jpg and assets/plates/credits.json. Re-runnable; skips files already present.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/plates
python3 - "$@" <<'PY'
import json, urllib.request, urllib.parse, os, sys, re
M = json.load(open("assets-manifest.json"))
FORCE = set(sys.argv[1:])
prev = {}
try: prev = json.load(open("assets/plates/credits.json"))
except Exception: pass
out = {}
UA = {"User-Agent": "Infera-MechanismSeries/1.0 (plates fetch; infera@melophon.com)"}
def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read() if binary else json.loads(r.read().decode("utf-8"))
def loc_largest(src):
    p = urllib.parse.urlsplit(src)
    qs = dict(urllib.parse.parse_qsl(p.query))
    sp = int(qs.get("sp", "0") or 0)
    qs["fo"] = "json"
    u = urllib.parse.urlunsplit((p.scheme, p.netloc, p.path.rstrip("/") + "/", urllib.parse.urlencode(qs), ""))
    j = get(u)
    urls = []
    item = j.get("item", {}) or {}
    # Multi-photo survey records (HABS/HAER ...?sp=N): take page N's own files first
    if sp:
        for res in j.get("resources", []) or []:
            fl = res.get("files") or []
            if len(fl) >= sp:
                page = fl[sp-1] if isinstance(fl[sp-1], list) else [fl[sp-1]]
                for ff in page:
                    if isinstance(ff, dict) and ff.get("url"):
                        mm = re.search(r"(https://tile\.loc\.gov/image-services/iiif/[^/]+)/", ff["url"])
                        if mm:
                            return mm.group(1) + "/full/1800,/0/default.jpg", (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
                pj = [ff["url"] for ff in page if isinstance(ff, dict) and re.search(r"\.jpe?g(\?|$)", ff.get("url",""), re.I)]
                if pj:
                    pj.sort(key=lambda x: {"u":4,"v":3,"r":2,"t":1}.get(re.sub(r".*\d(\w)\.jpe?g.*", r"\1", x), 0), reverse=True)
                    return pj[0], (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
                break
    for k in ("image_url",):
        v = item.get(k) or j.get(k)
        if isinstance(v, list): urls += v
    for res in j.get("resources", []) or []:
        for k in ("image", "url"):
            if isinstance(res.get(k), str): urls.append(res[k])
        for f in res.get("files", []) or []:
            for ff in (f if isinstance(f, list) else [f]):
                if isinstance(ff, dict) and ff.get("url"): urls.append(ff["url"])
    # Prefer the IIIF service: rewrite any IIIF URL to a 1,800-pixel render
    for x in urls:
        m = re.search(r"(https://tile\.loc\.gov/image-services/iiif/[^/]+)/", x)
        if m: return m.group(1) + "/full/1800,/0/default.jpg", (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
    # Build the IIIF URL from a resource id when the JSON offers none (highsm.NNNNN, fsa.8dNNNNN)
    m = re.search(r"/resource/(highsm|fsa)\.([0-9a-z]+)", src)
    if m:
        col, rid = m.group(1), m.group(2)
        if col == "highsm":
            svc = f"service:pnp:highsm:{rid[:3]}00:{rid}"
        else:
            return f"https://tile.loc.gov/storage-services/service/pnp/fsa/{rid[:4]}000/{rid[:5]}00/{rid}v.jpg", (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
        return f"https://tile.loc.gov/image-services/iiif/{svc}/full/1800,/0/default.jpg", (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
    jpgs = [x for x in urls if re.search(r"\.jpe?g(\?|$)", x, re.I) and "_150px" not in x]
    def rank(x):
        m = re.search(r"pct:(\d+)", x);
        if m: return int(m.group(1))
        m = re.search(r"/full/(\d+),", x)
        if m: return int(m.group(1))
        return {"u":4,"v":3,"r":2,"t":1}.get(re.sub(r".*\d(\w)\.jpe?g.*", r"\1", x), 0)
    jpgs.sort(key=rank, reverse=True)
    if not jpgs: raise RuntimeError("no jpeg found for " + src)
    return jpgs[0], (item.get("title") or j.get("title") or ""), (item.get("rights") or j.get("rights") or "")
def commons(title):
    q = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
        "action":"query","titles":title,"prop":"imageinfo","iiprop":"url|extmetadata","iiurlwidth":"2000","format":"json"})
    j = get(q)
    page = list(j["query"]["pages"].values())[0]
    ii = page["imageinfo"][0]; em = ii.get("extmetadata", {})
    lic = em.get("LicenseShortName", {}).get("value", ""); art = re.sub("<[^>]+>", "", em.get("Artist", {}).get("value", ""))
    return ii.get("thumburl") or ii["url"], page.get("title",""), (lic + (" · " + art if art else ""))
for key, m in M.items():
    dest = f"assets/plates/{key}.jpg"
    try:
        if m["kind"] == "loc":
            url, title, rights = loc_largest(m["src"])
        else:
            url, title, rights = commons(m["src"])
        if key in FORCE and os.path.exists(dest): os.remove(dest)
        if not os.path.exists(dest):
            data = get(url, binary=True)
            open(dest, "wb").write(data)
            print(f"ok   {key}  {len(data)//1024} KB  <- {url}")
        else:
            print(f"keep {key}")
        out[key] = {"source": m["src"], "file_url": url, "title": title, "rights": rights, "credit": m["credit"]}
    except Exception as e:
        print(f"FAIL {key}: {e}", file=sys.stderr)
        out[key] = prev.get(key) if (os.path.exists(dest) and prev.get(key)) else {"source": m["src"], "error": str(e), "credit": m["credit"]}
json.dump(out, open("assets/plates/credits.json", "w"), indent=1)
print("wrote assets/plates/credits.json")
PY
echo "Done. Any FAIL above means that key's plate or reel slide shows the hatched fallback."
