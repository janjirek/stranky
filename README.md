# Pridavani Obsahu na Stranku Zmeny

---

> Slug v MD se vzdy pise bez / na zacatku, takze jen napr. "chata-citkov" a nikoli "/chata-citkov", vsude to tak ted je spravne, bylo jen par mist, kde to bylo spatne

## Pro linkovani obrazku primo ze stranky a nikoli z Cloudinary

Kazdy MD file (aktivni nemovitost, realizovana zakazka ci clanek) ma ted novy attribute, pro obrazky a thumbnaily - **images_local** a **thumbnail_local**, mohou a nemusi tam byt, tim je zajistena zpetna kompatibilita.

**images_local a thumbnail_local maji vzdy prioritu, jestli v hlavicce existuji, tak se vzdy pouziji lokalni verze, ikdyz muze byt zaroven definovano thubnail a images attributy z Cloudinary**

Priklad nemovitosti

```
title: TEST Prodej rodinného domu 137 m², pozemek 846 m², Heřmanův Městec – Konopáč
type: prodej
description: Nabízím vám k prodeji třípodlažní rodinný dům o dispozici 4+kk, který se nachází přímo v srdci rekreační oblasti Konopáč..
date: 2025-09-06
tags: [dům, prodej, Konopáč, Heřmanův Městec, tenis, rodinný dům, bydlení]
thumbnail_local: konpac-rd-5.jpg
images_local:
  - konpac-rd-15.jpg
  - konpac-rd-4.jpg
  - konpac-rd-42.webp
  - konpac-rd-5.jpg
images:
  - konpac-rd
  - konpac-rd-10
  - konpac-rd-11
  - konpac-rd-12
  - konpac-rd-13
price: 4.300.000 Kč
location: Konopáč 31, 538 03 Heřmanův Městec - Konopáč, Česko
mapy_link: https://mapy.com/s/fusohuruko
youtube_link: https://www.youtube.com/embed/4F1JuIJb88I?si=lmWjrD8ZYGJD5ZHC
slug: konopac_local
```

Nemovitost ma jen lokalni thumbnail definovan, a pak ma definovane images array z ID z Cloudinary + images_local co obsahuje file names primo ze stranky. **Cili na strance se pouzije lokalni verze thumbnailu a i lokalni obrazky ze stranky a Cloudinary images se ignoruji.** **Stejne chovani je pro realizovane zakazky a v pripade thumbnailu i pro clanky.**

### Jak pracovat s lokalnimi obrazky primo v textu MD

Podobne jako s Cloudinary obrazky, jen se pouziva relativni odkaz, priklad nize.

```
Nabízím vám k prodeji třípodlažní rodinný dům o dispozici 4+kk, který se nachází přímo v srdci rekreační oblasti Konopáč.

![Rodinný dům Konopáč](/konopac_local/konpac-rd-4.jpg)Dům byl postaven v průběhu 80. let z kombinace plynosilikátu a cihel a nachází se na pozemku o velikosti 846 m².

| ![Rodinný dům Konopáč](https://res.cloudinary.com/dgnpeadbj/image/upload/f_auto,q_auto,w_1600//v1757076368/konpac-rd-11.jpg) | ![Rodinný dům Konopáč](/konopac_local/konpac-rd-15.jpg) |
```

Na ukazce je videt rozdil lokalnich obrazku oproti Cloudinary obrazkum, absolutni vs relativni cesta. Cili pro lokalni obrazky je cesta vzdy /_slug_/nazev souboru ze slozky vytvorene v Public slozce (viz nize).

### Kam se lokalni obrazky nahravaji

Primo do kodu stranky, najit public folder a v nem vzdy vytvorit novou slozku, at jde o nemovitost, zakazku ci clanek. **Nazev slozky musi byt vzdy stejny jako slug definovany v MD filu.**

Priklad, kdyz mam slug v MD

```
slug: konopac_local
```

Tak zde vytvorim slozku "konopac_local"

```
/
├── public/
│   └── konopac_local
```

Do teto slozky pak hazim obrazky, jejiz nazvy pak pisu do MD filu, jak je ukazano vyse.
