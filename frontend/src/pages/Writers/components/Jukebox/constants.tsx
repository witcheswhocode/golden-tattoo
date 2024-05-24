interface WriterDetail {
  writerid: number;
  writers: string;
  numsongs: number;
  imgurl: string;
  colorpill: string;
}

type WriterDetailsMap = {
  [key: string]: WriterDetail;
};

export const writerDetails: WriterDetailsMap = {
  "Taylor Swift": {
    writerid: 1,
    writers: "Taylor Swift",
    numsongs: 158,
    imgurl: "https://images.wsj.net/im-503318?width=1280&size=1",
    colorpill: "#1C88C7",
  },
  "Jack Antonoff": {
    writerid: 2,
    writers: "Jack Antonoff",

    numsongs: 24,
    imgurl:
      "https://i.guim.co.uk/img/media/bdfb935696c50dfa32d63c76b4ac6048f3e6a0e7/364_481_5106_3064/master/5106.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ec6ca092cb02499dce907863dacfa684",
    colorpill: "#FCC700",
  },
  "Aaron Dessner": {
    writerid: 3,
    writers: "Aaron Dessner",

    numsongs: 22,
    imgurl:
      "https://www.billboard.com/wp-content/uploads/2020/08/Aaron-Dessner-may-2019-a-billboard-1548-1596559843.jpg?w=1024",
    colorpill: "#973aa8",
  },
  "Max Martin": {
    writerid: 4,
    writers: "Max Martin",

    numsongs: 21,
    imgurl:
      "https://i.insider.com/56193d09dd089543648b4584?width=1000&format=jpeg&auto=webp",
    colorpill: "#ca0f2e",
  },
  Shellback: {
    writerid: 5,
    writers: "Shellback",

    numsongs: 20,
    imgurl:
      "https://m.media-amazon.com/images/M/MV5BZGFmZDJmYjMtOTI0NS00NDRlLWFlMDAtZjRhMzQ3OGFjYTVlXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
    colorpill: "#38a3a5",
  },
  "Liz Rose": {
    writerid: 6,
    writers: "Liz Rose",

    numsongs: 16,
    imgurl:
      "https://media2.dallasobserver.com/dal/imager/u/magnum/11548714/liz_rose.jpeg?cb=1642543550",
    colorpill: "#bba251",
  },
  "William Bowery": {
    writerid: 7,
    writers: "William Bowery",

    numsongs: 5,
    imgurl:
      "https://i.pinimg.com/736x/2a/77/a6/2a77a6fb864f2b974952c30270ccf001.jpg",
    colorpill: "#d5c6ff",
  },
  "Joel Little": {
    writerid: 8,
    writers: "Joel Little",

    numsongs: 4,
    imgurl:
      "https://www.billboard.com/wp-content/uploads/media/Joel-Little-2019-billboard-1548.jpg",
    colorpill: "",
  },
  "Frank Dukes": {
    writerid: 9,
    writers: "Frank Dukes",

    numsongs: 3,
    imgurl:
      "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/12/12/sl336qlzfbcfciniv0e0/frank-dukes-red-bull-music-festival",
    colorpill: "",
  },
  "Robert Ellis Orrall": {
    writerid: 10,
    writers: "Robert Ellis Orrall",

    numsongs: 3,
    imgurl:
      "https://alchetron.com/cdn/robert-ellis-orrall-b3524830-41e4-44f3-92ad-04f0934f1dd-resize-750.jpeg",
    colorpill: "",
  },
  "Louis Bell": {
    writerid: 11,
    writers: "Louis Bell",

    numsongs: 3,
    imgurl:
      "https://static.stereogum.com/uploads/2019/03/Louis-Bell-1552941713-scaled.jpg",
    colorpill: "",
  },
  "Ryan Tedder": {
    writerid: 12,
    writers: "Ryan Tedder",

    numsongs: 2,
    imgurl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDixsRsZJsZZnEmh_ETHghNiLpmlZzSCANfA&usqp=CAU",
    colorpill: "",
  },
  "Ali Payami": {
    writerid: 13,
    writers: "Ali Payami",

    numsongs: 2,
    imgurl:
      "https://img.discogs.com/mMT_rvOVct0p78lJcRE5yJfJ3hc=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-281132-1240777661.jpeg.jpg",
    colorpill: "",
  },
  "Justin Vernon": {
    writerid: 14,
    writers: "Justin Vernon",

    numsongs: 2,
    imgurl:
      "http://merciad.mercyhurst.edu/wp-content/uploads/files/bon%20iver.jpg",
    colorpill: "",
  },
  "Tommy Lee James": {
    writerid: 15,
    writers: "Tommy Lee James",

    numsongs: 2,
    imgurl:
      "https://static.wixstatic.com/media/b0f586_26c9fb795c224d8aa5d602c983e1fc0c~mv2.jpg/v1/crop/x_0,y_12,w_450,h_453/fill/w_540,h_542,al_c,lg_1,q_90,enc_auto/james.jpg",
    colorpill: "",
  },
  "Dan Wilson": {
    writerid: 16,
    writers: "Dan Wilson",

    numsongs: 2,
    imgurl:
      "https://variety.com/wp-content/uploads/2017/07/dan-wilson.jpg?w=1000",
    colorpill: "",
  },
  "Ed Sheeran": {
    writerid: 17,
    writers: "Ed Sheeran",

    numsongs: 2,
    imgurl: "https://www.songhall.org/images/uploads/news/Ed-Sheeransm.jpg",
    colorpill: "",
  },
  "Angelo Petraglia": {
    writerid: 18,
    writers: "Angelo Petraglia",

    numsongs: 2,
    imgurl:
      "https://images.genius.com/54230eb19365c1f7df0299c6c9c9b315.770x770x1.jpg",
    colorpill: "",
  },
  "Imogen Heap": {
    writerid: 19,
    writers: "Imogen Heap",

    numsongs: 1,
    imgurl: "https://i.iheart.com/v3/catalog/artist/16221?ops=fit(720%2C720)",
    colorpill: "",
  },
  "Bryce Dessner": {
    writerid: 20,
    writers: "Bryce Dessner",

    numsongs: 1,
    imgurl:
      "https://www.ascap.com/~/media/site-pages/news-and-events/events/2021/sundance/composer-headshots/dessner_bryce.jpg",
    colorpill: "",
  },
  "Brad Warren": {
    writerid: 21,
    writers: "Brad Warren",

    numsongs: 1,
    imgurl:
      "https://www.spiritmusicgroup.com/SpiritMusicGroup/media/Client-Thumbnails/WarrenBros_400x400.jpg?ext=.jpg",
    colorpill: "",
  },
  "Colbie Caillat": {
    writerid: 22,
    writers: "Colbie Caillat",

    numsongs: 1,
    imgurl:
      "https://lastfm.freetls.fastly.net/i/u/770x0/f482a19e46dfcd72a4f4ec0bff8e3e62.jpg",
    colorpill: "",
  },
  "Hillary Lindsey": {
    writerid: 23,
    writers: "Hillary Lindsey",

    numsongs: 1,
    imgurl:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Hillary_Lindsey%2C_ASCAP_concert%2C_2011.jpg",
    colorpill: "",
  },
  "John Rich": {
    writerid: 24,
    writers: "John Rich",

    numsongs: 1,
    imgurl:
      "https://static.infofamouspeople.com/avatar_thumb/300w/bn2rlf2et7gmobaoq3eg_headshots_john-rich-2.jpg",
    colorpill: "",
  },
  "Scooter Carusoe": {
    writerid: 25,
    writers: "Scooter Carusoe",

    numsongs: 1,
    imgurl:
      "https://brokeass2-9uzlt3u.netdna-ssl.com/wp-content/pictsnShit/2018/12/bird-in-trash.jpg",
    colorpill: "",
  },
  "Brendon Urie": {
    writerid: 26,
    writers: "Brendon Urie",

    numsongs: 1,
    imgurl:
      "data:image/jpeg;base64,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",
    colorpill: "",
  },
  "Matthew Tavares": {
    writerid: 27,
    writers: "Matthew Tavares",

    numsongs: 1,
    imgurl: "https://i.scdn.co/image/ab677762000056b86ff2e1afaa56be23c289e667",
    colorpill: "",
  },
  Sounwave: {
    writerid: 28,
    writers: "Sounwave",

    numsongs: 1,
    imgurl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QEFRXhpZgAASUkqAAgAAAADAA4BAgC6AAAAMgAAAJiCAgARAAAA7AAAABIBAwABAAAAAQAAAAAAAABMT1MgQU5HRUxFUywgQ0FMSUZPUk5JQSAtIEZFQlJVQVJZIDA1OiAoRk9SIEVESVRPUklBTCBVU0UgT05MWSkgU291bndhdmUgYXR0ZW5kcyB0aGUgNjV0aCBHUkFNTVkgQXdhcmRzIG9uIEZlYnJ1YXJ5IDA1LCAyMDIzIGluIExvcyBBbmdlbGVzLCBDYWxpZm9ybmlhLiAoUGhvdG8gYnkgSmVmZiBLcmF2aXR6L0ZpbG1NYWdpYykyMDIzIEplZmYgS3Jhdml0ev/tARBQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAA9BwCUAAMSmVmZiBLcmF2aXR6HAJ4ALpMT1MgQU5HRUxFUywgQ0FMSUZPUk5JQSAtIEZFQlJVQVJZIDA1OiAoRk9SIEVESVRPUklBTCBVU0UgT05MWSkgU291bndhdmUgYXR0ZW5kcyB0aGUgNjV0aCBHUkFNTVkgQXdhcmRzIG9uIEZlYnJ1YXJ5IDA1LCAyMDIzIGluIExvcyBBbmdlbGVzLCBDYWxpZm9ybmlhLiAoUGhvdG8gYnkgSmVmZiBLcmF2aXR6L0ZpbG1NYWdpYykcAnQAETIwMjMgSmVmZiBLcmF2aXR6HAJuAAlGaWxtTWFnaWP/4QXQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIGRjOlJpZ2h0cz0iMjAyMyBKZWZmIEtyYXZpdHoiIHBob3Rvc2hvcDpDcmVkaXQ9IkZpbG1NYWdpYyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjE0NjM4ODg3MzMiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9ldWxhP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+SmVmZiBLcmF2aXR6PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5MT1MgQU5HRUxFUywgQ0FMSUZPUk5JQSAtIEZFQlJVQVJZIDA1OiAoRk9SIEVESVRPUklBTCBVU0UgT05MWSkgU291bndhdmUgYXR0ZW5kcyB0aGUgNjV0aCBHUkFNTVkgQXdhcmRzIG9uIEZlYnJ1YXJ5IDA1LCAyMDIzIGluIExvcyBBbmdlbGVzLCBDYWxpZm9ybmlhLiAoUGhvdG8gYnkgSmVmZiBLcmF2aXR6L0ZpbG1NYWdpYyk8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBs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",
    colorpill: "",
  },
  "St. Vincent": {
    writerid: 29,
    writers: "St. Vincent",

    numsongs: 1,
    imgurl:
      "https://maximumfun.org/wp-content/uploads/2019/08/st-vincent-400x400.jpg",
    colorpill: "",
  },
  "Jacknife Lee": {
    writerid: 30,
    writers: "Jacknife Lee",

    numsongs: 1,
    imgurl:
      "data:image/jpeg;base64,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",
    colorpill: "",
  },
  Future: {
    writerid: 31,
    writers: "Future",

    numsongs: 1,
    imgurl:
      "https://vz.cnwimg.com/thumb-1200x/wp-content/uploads/2019/12/fn.png",
    colorpill: "",
  },
  "Oscar Holter": {
    writerid: 32,
    writers: "Oscar Holter",

    numsongs: 1,
    imgurl:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Oscar_Holter_in_the_studio_2014_with_Ti%C3%ABsto.jpg",
    colorpill: "",
  },
  OZGO: {
    writerid: 33,
    writers: "OZGO",

    numsongs: 1,
    imgurl:
      "https://i.discogs.com/EbSQCYkWcO2HFOsAhbgxvhsSMrgWrz10UJ22K19iK3c/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE1NDA0/NDgtMTY0Mjg5MTY4/Ni0xMTQ1LmpwZWc.jpeg",
    colorpill: "",
  },
  "Rob Manzoli": {
    writerid: 34,
    writers: "Rob Manzoli",

    numsongs: 1,
    imgurl:
      "https://i.discogs.com/ssPBg394bxnFx8m4XfDlMDHl_6eO6GG32ouMHYIHioE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTQ0OTk2/Mi0xNDQxNTI5OTcw/LTgwODguanBlZw.jpeg",
    colorpill: "",
  },
  "Martin Johnson": {
    writerid: 35,
    writers: "Martin Johnson",

    numsongs: 1,
    imgurl:
      "http://riffmagazine.com/wp-content/uploads/2018/05/Martin-Johnson-604.jpg",
    colorpill: "",
  },
  "Brian Maher": {
    writerid: 36,
    writers: "Brian Maher",

    numsongs: 1,
    imgurl:
      "https://img.discogs.com/5AGsKgIDvXyvlvqKR5VtO_ET56M=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-1431396-1460046139-9510.jpeg.jpg",
    colorpill: "",
  },
  "Troy Verges": {
    writerid: 37,
    writers: "Troy Verges",

    numsongs: 1,
    imgurl:
      "https://sitecoreaudioprod.umusicpub.com/sitecore_media/6A085544-8C4B-475B-992E-2DFCFBA915A7.jpg?cc=98201653944AM",
    colorpill: "",
  },
  "Brett Warren": {
    writerid: 38,
    writers: "Brett Warren",

    numsongs: 1,
    imgurl:
      "https://www.spiritmusicgroup.com/SpiritMusicGroup/media/Client-Thumbnails/WarrenBros_400x400.jpg?ext=.jpg",
    colorpill: "",
  },
  "Nathan Barlowe": {
    writerid: 39,
    writers: "Nathan Barlowe",

    numsongs: 1,
    imgurl:
      "https://musicrow.com/wp-content/uploads/2020/12/Nathan-Barlowe_photocredit_Kenneth-Cappello1.jpg",
    colorpill: "",
  },
  "Cautious Clay": {
    writerid: 40,
    writers: "Cautious Clay",

    numsongs: 1,
    imgurl:
      "https://sistaticv2.blob.core.windows.net/cultured-mag/img/library/9a81a37f-d4cd-476f-8ce6-a89588c11170.jpg",
    colorpill: "",
  },
  "Gary Lightbody": {
    writerid: 41,
    writers: "Gary Lightbody",

    numsongs: 1,
    imgurl:
      "https://bloximages.chicago2.vip.townnews.com/celebretainment.com/content/tncms/assets/v3/editorial/7/03/7035860e-a267-57dc-8ddc-c8aecb2b236f/5f3e3fb83c10d.image.jpg?crop=650%2C650%2C175%2C0&resize=1200%2C1200&order=crop%2Cresize",
    colorpill: "",
  },
  "Richard Fairbrass": {
    writerid: 42,
    writers: "Richard Fairbrass",

    numsongs: 1,
    imgurl:
      "https://theancestory.com/wp-content/uploads/2022/03/Fred-Fairbrass-698x400.png",
    colorpill: "",
  },
  "Brett James": {
    writerid: 43,
    writers: "Brett James",

    numsongs: 1,
    imgurl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brett_James_performing_at_Ramstein_Air_Base%2C_2015.jpg/220px-Brett_James_performing_at_Ramstein_Air_Base%2C_2015.jpg",
    colorpill: "",
  },
  "Cary Barlowe": {
    writerid: 44,
    writers: "Cary Barlowe",

    numsongs: 1,
    imgurl:
      "data:image/jpeg;base64,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",
    colorpill: "",
  },
  "Fred Fairbrass": {
    writerid: 45,
    writers: "Fred Fairbrass",

    numsongs: 1,
    imgurl:
      "https://theancestory.com/wp-content/uploads/2022/03/Fred-Fairbrass-698x400.png",
    colorpill: "",
  },
  "Lana Del Rey": {
    writerid: 46,
    writers: "Lana Del Rey",

    numsongs: 1,
    imgurl:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/22/19/gettyimages-1202161935.jpg",
    colorpill: "",
  },
  "Sam Dew": {
    writerid: 47,
    writers: "Sam Dew",

    numsongs: 2,
    imgurl:
      "https://media.npr.org/assets/img/2021/02/25/sam-dew-photo-1-by-christian-lanza-_wide-5d60697a8ea287e8d769e11caffad7cab1c87957.jpg?s=400&c=85&f=jpeg",
    colorpill: "",
  },
  "Jahaan Sweet": {
    writerid: 48,
    writers: "Jahaan Sweet",

    numsongs: 2,
    imgurl: "https://i.scdn.co/image/ab677762000056b839f316cb0b298cb4da6bb19c",
    colorpill: "",
  },
  "Zoë Kravitz": {
    writerid: 49,
    writers: "Zoë Kravitz",

    numsongs: 1,
    imgurl:
      "data:image/jpeg;base64,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",
    colorpill: "",
  },
  "Keanu Beats": {
    writerid: 50,
    writers: "Keanu Beats",

    numsongs: 1,
    imgurl:
      "https://pbs.twimg.com/profile_images/1594130479862534144/RJmsAojP_400x400.jpg",
    colorpill: "",
  },
};
