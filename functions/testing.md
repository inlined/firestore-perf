# Method

Purging the cache causes memory leaks, and the GCF environment notices that the function
runs out of its memory limit and terminates it (rather than applying GC pressure).

We could hypothetically increase the memory usage, but then this also increases CPU allocation
and makes all timings less realistic for normal functions customers. Instead, we can
run the function multiple times and only count the results that don't run out of memory:

```
curl -X POST -d {"times": 20} <function URL>
```

(note, we can't just use the garbage collector manually because it isn't exposed in
the GCF runtime).

# Results
## TL;DR
## Details
### Vanilla

### Optimized