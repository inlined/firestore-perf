# Method

Purging the cache causes memory leaks, and the GCF environment notices that the function
runs out of its memory limit and terminates it (rather than applying GC pressure).

We could hypothetically increase the memory usage, but then this also increases CPU allocation
and makes all timings less realistic for normal functions customers. Instead, we can
create a harness that runs a worker for N iterations and then crashes the worker to reset
the memory usage.

(note, we can't just use the garbage collector manually because it isn't exposed in
the GCF runtime).

# Results
## TL;DR
## Details
### Vanilla
```
{"p50":206,"p90":233,"p95":385,"raw":[579,223,205,199,201,213,191,192,198,200,195,220,234,240,208,221,188,186,190,184,591,239,232,221,212,222,218,200,206,246,220,210,228,231,223,255,240,236,243,231,586,220,201,215,207,204,202,191,204,206,191,199,190,190,186,223,188,186,200,195,543,232,218,197,212,206,199,193,199,222,192,194,196,190,200,193,226,191,196,206,577,223,209,202,202,207,202,200,205,223,210,211,204,197,198,199,214,194,197,205,515,227,225,200,196,204,200,188,199,211,214,209,194,194,189,190,211,192,194,205,526,238,214,203,206,235,207,190,210,221,192,203,206,211,215,221,193,193,200,203,549,225,202,205,216,216,212,187,196,218,193,206,211,217,209,231,215,202,194,195,646,225,213,216,221,210,227,200,204,218,194,209,200,197,210,207,217,197,215,188,585,208,218,205,209,210,197,231,207,230,200,203,217,215,208,225,204,192,197,216]}
```
### Optimized