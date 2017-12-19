---
title: Your multi-threaded code is broken (and I can prove it)
source: http://coding.sch.bme.hu:8080/bss_vagott_web_16a9_HD/high_quality/simonyikonf2015_ib028_08_hq_HD.mp4
aspectRatio: 1.7777777777777777
thumbnail: ../../../static/assets/logos/ten-tenths-consulting.png
---

Yesterday’s single-threaded code is a dead-end. Servers, laptops and even phones
now have 2, 4, or 8 cores; in the future it will be 32, 64 or more. Taking
advantage of multiple cores means multiple threads. But writing multi-threaded
code is hard; much harder than you think. So hard, in fact, that almost all
multi-threaded code is broken. In this talk, I’ll show you why. And then I’ll
show you how approaches (like functional programming, actors, CSP and
Software-Transactional Memory) avoid these problems and allow you to write
multi-threaded code that actually works.
