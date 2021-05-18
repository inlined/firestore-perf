# Method

Measures the time to import the firebase functions library and process the trampoline
code in the onWrite event handler. A shard calculates this timing several times by
purging `require.cache`. This causes a memory leak which will eventually cause a worker
to die. A top-level function fans out a benchmark to multiple shards which may each
complete or run out of memory. After a successful run from N shards, basic stats
are calculated and displayed.

You can test this out by running ./test.sh <projectId>

# Results

Vanilla:
{"p50":257,"p90":328,"p95":898,"p99":1648.5,"raw":[1029,1034,1037,1038,1039,1059,1106,1194,1194,1199,1201,1283,1296,1302,1306,1313,1315,139,141,141,141,145,145,145,145,146,146,146,147,147,149,1493,1496,150,150,1507,151,151,151,154,155,155,156,156,156,157,1577,158,159,159,159,159,160,160,163,163,164,164,164,165,166,166,167,167,167,167,167,168,168,168,168,168,169,169,170,170,170,1720,173,173,174,174,175,175,175,175,175,175,176,176,176,176,177,177,178,178,178,179,179,179,179,180,180,1805,181,181,182,182,182,182,183,183,183,183,184,184,185,186,187,187,187,188,188,189,189,189,189,189,190,190,191,191,191,191,191,191,192,192,192,192,192,192,193,193,193,193,193,193,194,195,195,195,196,196,197,199,1999,200,200,201,202,202,202,202,203,203,204,205,205,205,207,207,207,207,207,208,208,208,208,209,209,209,210,210,210,211,2115,212,212,212,213,213,213,214,215,215,215,215,215,215,216,216,217,217,218,219,219,220,220,221,221,221,221,222,222,222,222,223,223,223,224,225,225,226,226,228,228,229,230,231,231,232,233,233,234,234,235,235,236,236,236,237,237,237,237,237,238,238,238,238,238,238,239,239,239,240,240,240,241,241,242,242,242,242,243,243,243,244,244,244,244,245,245,245,245,245,245,246,246,246,246,247,247,247,248,248,249,249,249,249,2499,250,250,250,251,251,251,251,252,252,252,252,253,253,253,254,254,254,254,255,255,255,255,255,255,255,256,256,256,256,256,256,257,257,257,257,257,258,258,258,258,258,258,258,258,259,259,259,259,259,259,260,260,260,260,260,260,261,261,261,261,261,261,261,262,262,262,262,262,262,262,262,262,263,263,263,263,263,264,264,265,265,265,265,265,265,265,265,265,266,266,266,267,267,267,267,267,267,267,267,267,268,268,268,268,269,269,269,269,269,269,270,270,270,270,270,270,270,270,270,271,271,271,271,271,272,273,273,273,273,273,273,274,274,274,275,275,276,276,276,276,276,277,277,277,278,278,278,278,278,278,278,278,279,279,280,280,280,280,280,281,281,281,281,281,281,281,283,283,284,285,285,285,285,285,286,286,286,286,286,287,289,289,290,290,290,290,290,290,290,292,292,292,292,293,293,294,294,295,296,296,296,296,296,296,297,298,298,298,298,298,299,299,299,299,299,299,301,302,302,302,302,302,303,304,304,305,305,305,305,305,306,306,306,306,306,306,306,306,306,306,306,307,307,308,308,308,310,310,310,310,311,311,311,311,311,312,313,313,314,315,315,315,318,318,319,319,320,321,322,323,324,325,325,325,327,329,329,330,330,330,331,331,331,332,337,337,3394,341,341,349,349,351,358,361,371,400,740,754,783,814,818,845,854,868,872,893,903,919,954]}

Optimized:
{"p50":214,"p90":260,"p95":283.5,"p99":1297,"raw":[1001,1103,1119,1191,1199,1201,1205,1207,1289,1295,1299,1303,1305,1399,146,150,150,151,155,156,158,158,158,158,159,159,159,159,159,160,160,160,160,161,161,161,161,162,162,162,162,162,163,164,164,164,164,164,164,164,164,164,165,166,166,166,166,167,167,167,167,167,168,168,168,168,168,168,168,169,169,169,169,169,170,170,170,171,171,172,172,172,173,173,173,173,173,174,174,174,174,174,174,174,174,174,175,175,175,175,176,176,176,176,176,176,177,177,177,177,177,177,177,178,178,178,179,179,179,1790,180,180,180,180,180,180,180,181,181,181,181,181,181,182,182,182,182,182,182,183,183,184,184,184,184,184,184,185,185,185,185,185,185,185,185,185,186,186,186,186,186,186,186,186,186,187,187,187,187,187,187,187,187,187,188,188,188,189,189,189,189,189,190,190,190,191,191,191,191,191,191,191,191,192,193,193,193,193,194,194,194,194,194,195,195,195,195,195,195,195,196,196,196,196,196,196,196,197,197,198,198,198,198,198,198,199,199,199,199,199,199,200,200,200,200,200,200,200,200,200,200,200,201,201,201,201,201,202,202,202,202,202,203,203,203,203,204,204,204,205,205,205,206,206,206,206,206,206,206,207,207,207,207,207,207,207,208,208,208,208,208,208,208,208,208,209,209,209,209,2092,210,210,210,210,210,210,211,211,211,211,211,211,211,211,211,211,212,212,212,212,212,212,213,214,214,214,214,214,214,214,214,214,214,214,215,215,215,215,215,215,216,216,216,216,216,217,217,217,217,217,217,217,218,218,218,218,219,219,219,219,219,219,219,219,220,220,220,220,220,220,221,221,221,221,221,221,221,222,222,222,222,222,222,222,223,223,223,223,223,224,224,224,224,224,224,224,225,225,225,225,225,225,225,225,226,226,226,226,226,226,226,226,226,226,227,227,227,227,227,227,227,227,227,228,228,228,228,228,229,229,229,229,229,229,229,230,230,230,230,230,231,231,231,231,231,232,232,232,232,233,233,233,233,234,234,234,234,235,235,235,235,235,235,235,235,235,236,236,236,237,237,237,237,237,237,237,238,238,238,238,239,239,239,239,239,240,240,240,240,240,240,241,241,241,242,242,242,242,243,243,243,243,243,243,243,243,244,244,244,244,244,244,244,244,245,245,245,245,245,246,246,246,246,246,247,247,247,247,248,248,248,248,249,249,249,249,249,250,250,250,250,250,251,251,251,252,252,252,253,253,253,253,254,254,254,255,255,255,256,257,258,258,258,259,259,259,261,262,265,265,265,265,265,267,267,268,269,270,270,270,271,271,271,271,272,272,275,276,276,278,278,280,281,281,281,282,285,286,292,292,294,296,299,308,315,337,903,906,917,985]}