drop table lyrics;
drop table word;
drop table album;
drop table song;

CREATE TABLE `album` (
	`albumid`	INTEGER,
	`album`	TEXT,
	`albumshort`	text,
	`released`	INTEGER,
	`totalwriters`	INTEGER,
	`totalsongs`	INTEGER,
	`totaloriginalsongs`	INTEGER,
	`totalsongsftv`	INTEGER,
	`totalselfwritten`	INTEGER,
	`spotify`	text,
	`apple`	text,
	`other`	text,
	`alb`	text,
	PRIMARY KEY(albumid)
);

CREATE TABLE `song` (
	`songid`	INTEGER,
	`song`	TEXT,
	`albumid`	INTEGER,
	`writers`	TEXT,
	`countwriters`	INTEGER,
	`producers`	TEXT,
	`countproducers`	INTEGER,
	PRIMARY KEY(songid)
);

CREATE TABLE `word` (
	`wordid`	INTEGER,
	`word`	CHAR(255),
	`otherwords`	TEXT,
	`categories`	TEXT,
	`categorieshtml`	TEXT,
	`songcount`	INTEGER,
	`wordcount`	INTEGER,
	`totalcount`	INTEGER,
	`active`	INTEGER,
	PRIMARY KEY(wordid)
);

CREATE TABLE `lyrics` (
	`lyricid`	INTEGER,
	`wordid`	INTEGER,
	`songid`	INTEGER,
	`albumid`	INTEGER,
	`lyric`	TEXT,
	`subtext`	TEXT,
	`lyrichtml`	TEXT,
	`lyricnum`	INTEGER,
	PRIMARY KEY(lyricid),
	FOREIGN KEY(`wordid`) REFERENCES word ( wordid ),
	FOREIGN KEY(`albumid`) REFERENCES album ( albumid ),
	FOREIGN KEY(`songid`) REFERENCES song ( songid )
);

/*select l.lyricid as lyricid,l.lyric as lyric,l.subtext as subtext,l.lyrichtml as lyrichtml
,a.album as album,a.albumshort as albumshort,a.alb as alb,s.song as song
from lyrics l join album a on a.albumid = l.albumid 
join word w on w.wordid = l.wordid 
join song s on s.songid = l.songid 
where l.wordid = 11 order by a.albumid*/

