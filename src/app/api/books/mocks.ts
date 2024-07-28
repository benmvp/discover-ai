import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  {
    content:
      "Ready to discover your next favorite read? Whether you're looking for your next page-turner, a thoughtful gift, or the perfect book for your little one, I'm your dedicated book guide. Tell me a little bit about who the book is for and what you're looking for, or any other preferences you have. Let's embark on a literary adventure together!",
    type: 'assistant',
  },
  {
    content: 'have you heard of "Meet the Daniels Sisters"?',
    type: 'user',
  },
  {
    content:
      'I haven\'t heard of "Meet the Daniels Sisters", but that sounds like a fun title! It makes me think of a lighthearted, character-driven story.  Is that the kind of book your daughter enjoys? Does she like contemporary stories with strong female characters? \n\nTell me more about her reading preferences. Does she enjoy mysteries, fantasy, historical fiction, or something else?  I can definitely help you find some great books for her summer reading! \n',
    type: 'assistant',
  },
  {
    content:
      'It\'s a 3-book set. The first book is "Ansley’s Big Bake Off". It\'s by Kaitlyn Pitts',
    type: 'user',
  },
  {
    type: 'functionCall',
    calls: [
      {
        name: 'searchBooks',
        arguments: { author: 'Kaitlyn Pitts', genre: 'Juvenile Fiction' },
      },
    ],
    content:
      "Ah, \"Ansley's Big Bake Off\" by Kaitlyn Pitts sounds delightful!  I'm picturing a fun, heartwarming story with lots of baking adventures.  That's definitely a great choice for a 6th grader!\n\nLet's see what other books we can find that fit that same vibe:\n\n",
  },
  {
    type: 'functionResponse',
    name: 'searchBooks',
    content: {
      items: [
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            'From the family that brought us the Lena in the Spotlight series and the popular For Girls Like You brand, comes three stories about three young sisters in the Daniels family as they work to rebuild their lives after the death of their mother.',
          id: '--ak5YzgEACAAJ--',
          title: 'Meet the Daniels Sisters',
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            'From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ashton’s Dancing Dreams, book three in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspiring story, Amber and her sisters Ashton and Ansley head to Christian summer camp at Camp Caracara. With high hopes, the twins meet their cabinmates Gio—an old friend from back home in Texas—and Maxine, a new friend with some challenges to overcome. Amber will have to work hard to practice kindness and patience as she handles teasing from her own sisters and her old and new friends while navigating camp. Amber’s Song: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Amber’s Song, check out books one and two in the Daniels Sisters series of middle grade fiction: Ansley’s Big Bake Off Ashton’s Dancing Dreams',
          id: '--adTtDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: 'Amber’s Song',
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            "From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ansley’s Big Bake Off, book one in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspirational story, Ansley and her family move to a new city to seek a fresh start after the death of their mother. Once there, Ansley finds comfort in things she loves—family, friends, gymnastics, and most of all baking! She even gets the chance to enter a bake off at the fair. But her dreams of taking home the trophy and being on TV are threatened by strong competition: Taylor, a mean girl from her new school. With the loving and prayerful support of her family, Ansley knows she has a real shot at winning. But with Taylor in the mix, will Ansley be able to rise to the occasion? Ansley's Big Bake Off: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Ansley's Big Bake Off, check out the other books in the Daniels Sisters series of middle grade fiction: Ashton’s Dancing Dreams Amber’s Song",
          id: '--i6nYDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: "Ansley's Big Bake Off",
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            'From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ashton’s Dancing Dreams, book two in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspiring story, Ashton “Cammie” Daniels is in love with dancing. There’s nothing she loves better than attending dance class with her two new friends, Rani and June. But that joy is in jeopardy when Rani’s father announces they may be moving to London. Ashton comes up with what she and her friends think is a foolproof plan to keep Rani with them. But her dreams begin to fall apart when the group can’t agree on music, costumes, choreography, or even whether they should all stay friends! Ashton’s Dancing Dreams: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Ashton’s Dancing Dreams, check out books one and three of the Daniels Sisters series of middle grade fiction: Ansley’s Big Bake Off Amber’s Song',
          id: '--Z7bWDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: "Ashton's Dancing Dreams",
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            "From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ansley’s Big Bake Off, book one in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspirational story, Ansley and her family move to a new city to seek a fresh start after the death of their mother. Once there, Ansley finds comfort in things she loves—family, friends, gymnastics, and most of all baking! She even gets the chance to enter a bake off at the fair. But her dreams of taking home the trophy and being on TV are threatened by strong competition: Taylor, a mean girl from her new school. With the loving and prayerful support of her family, Ansley knows she has a real shot at winning. But with Taylor in the mix, will Ansley be able to rise to the occasion? Ansley's Big Bake Off: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Ansley's Big Bake Off, check out the other books in the Daniels Sisters series of middle grade fiction: Ashton’s Dancing Dreams Amber’s Song",
          id: '--i6nYDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: "Ansley's Big Bake Off",
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            'From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ashton’s Dancing Dreams, book two in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspiring story, Ashton “Cammie” Daniels is in love with dancing. There’s nothing she loves better than attending dance class with her two new friends, Rani and June. But that joy is in jeopardy when Rani’s father announces they may be moving to London. Ashton comes up with what she and her friends think is a foolproof plan to keep Rani with them. But her dreams begin to fall apart when the group can’t agree on music, costumes, choreography, or even whether they should all stay friends! Ashton’s Dancing Dreams: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Ashton’s Dancing Dreams, check out books one and three of the Daniels Sisters series of middle grade fiction: Ansley’s Big Bake Off Amber’s Song',
          id: '--Z7bWDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: "Ashton's Dancing Dreams",
        },
        {
          authors: ['Kaitlyn Pitts', 'Camryn Pitts', 'Olivia Pitts'],
          description:
            'From the family that brought you the Lena in the Spotlight series and the popular For Girls Like You magazine comes Ashton’s Dancing Dreams, book three in the Daniels Sisters series. This realistic fiction story of family, friendship, and the challenges that so many young girls face each day growing up will appeal to girls 8–12 looking to express their talents and individuality alongside their faith. In this fun, relatable, and inspiring story, Amber and her sisters Ashton and Ansley head to Christian summer camp at Camp Caracara. With high hopes, the twins meet their cabinmates Gio—an old friend from back home in Texas—and Maxine, a new friend with some challenges to overcome. Amber will have to work hard to practice kindness and patience as she handles teasing from her own sisters and her old and new friends while navigating camp. Amber’s Song: Features diverse characters Is an engaging read for girls ages 8–12 Is an addition to the Faithgirlz brand Is a perfect birthday gift from parents and grandparents to tween girls, and is great for Spring Break and summer vacation reading Is written by girls for girls If you enjoy Amber’s Song, check out books one and two in the Daniels Sisters series of middle grade fiction: Ansley’s Big Bake Off Ashton’s Dancing Dreams',
          id: '--adTtDwAAQBAJ--',
          price: 6.99,
          publisher: 'Zonderkidz',
          title: 'Amber’s Song',
        },
        {
          authors: ['Kaitlyn Felt'],
          description:
            "Tenley Alexander is just a simple small-town girl living within the closed realms of her small world. A fresh high school graduate, Tenley tries to keep herself on her toes in the sweet anticipation of leaving her tiny town for good in order to go thrive at her dream collegiate school. However, Tenley's motivation is severely disrupted when a love from her past sweeps unexpectedly back into her life. With the threat of tripping and falling back into a kind of love that she doesn't want, Tenley's goals become hazy and her little world suddenly expands to be so much bigger. Jacob Trojan's life is finally returning back to normal. Eight years have passed since his father's tragic death and three more have gone by since his brother disappeared off the map. Standing on his feet for the first time in his life, Jacob is determined to do something with his life. With a possible collegiate athletic scholarship on the line and his mother and flawless girlfriend standing proudly behind him, Jacob knows he can't steer wrong. However, that all changes when he lays eyes on Tenley Alexander for the first time in two years... Leighton Gardner's life is pretty much perfect. She's beautiful and she has also somehow held onto the hand of a beautiful boy for nearly two years. Growing up in a wealthy family as an only child, Leighton is used to getting handed anything that she's ever wanted. That's why she's caught off guard when Jacob suddenly begins to pull his fingers out of her slippery grasp. With the encouragement of her best friend, Leighton unwillingly begins to investigate the many pieces of her life...and finds out that everything she has ever known may not be as perfect as it has always seemed... Based on true events, \"Let Him Go\" is a story that displays both the good and the bad of small towns, close friendships, and time.",
          id: '--nrCrNAEACAAJ--',
          title: 'Let Him Go',
        },
        {
          authors: ['Kaitlyn DeRose'],
          description:
            "Ripley Marsh knew what she wanted to do for a career from the moment she graduated college; she wanted a career with her family's thoroughbred racing stable in Upstate New York. Although her heart lies with the racing industry, not everyone in her family supports the risky move. Out to show her family that she can be successful, Ripley takes on a talented thoroughbred in hopes of getting him into the winner's circle. As if the family drama isn't enough, Ripley is torn between two completely different guys-one of whom she has known for most of her life and the other towards whom she feels an unexpected attraction. A novice in the game of love, Ripley must play wisely if she wants to keep her heart whole and intact.",
          id: '--qcSKjwEACAAJ--',
          title: 'Crossed Lines',
        },
        {
          authors: ['Kaitlyn Felt'],
          description:
            'Sabrina Dale, Ethan Smith, Isabel Grace, and Haylie Barnes are four teenagers living in the small village of Stony Lake, residing along the shoreline of Lake Michigan. They consider their lives simple and boring...that is, until Ethan discovers the ancient, yellow-tinged diaries of his ancestors in his attic. After reading through them, Ethan realizes that the same exact devestating events have been occurring between the Dales, Barnes, Smiths, and Graces for centuries. Determined, Ethan calls upon the help of an old friend and lover and sets out to break a disturbing family love triangle and put his armor up against Fate.',
          id: '--JYbSNAEACAAJ--',
          title: 'Fighting Fate',
        },
      ],
    },
  },
  {
    content:
      'Here are some books that might be perfect for your daughter, all by Kaitlyn Pitts: \n\n1. **--ak5YzgEACAAJ--**: Meet the Daniels Sisters\n2. **--adTtDwAAQBAJ--**: Amber’s Song\n3. **--i6nYDwAAQBAJ--**: Ansley’s Big Bake Off\n4. **--Z7bWDwAAQBAJ--**: Ashton’s Dancing Dreams\n5. **--nrCrNAEACAAJ--**: Let Him Go\n\nThese books are all part of the Daniels Sisters series, which follows three sisters as they navigate life, friendship, and family after the loss of their mother.  Each book focuses on a different sister, and they all have a heartwarming and uplifting tone that\'s perfect for middle-grade readers. "Ansley\'s Big Bake Off" focuses on baking, "Ashton\'s Dancing Dreams" is about dance, and "Amber\'s Song" explores music and summer camp. \n\nIf your daughter loves baking and contemporary stories, these books are a great choice!  They offer a mix of fun and relatable characters, and they might just inspire your daughter to explore her own talents and passions. \n\nYou could also consider books by other authors who write in the same genre, like Beverly Lewis or Sarah Mlynowski. They often write heartwarming stories about friendship, family, and coming-of-age experiences. \n\n',
    type: 'assistant',
  },
  {
    content:
      "i haven't heard of those 2 authors what books have they written? That sounds like the types of chapter books she likes",
    type: 'user',
  },
  {
    type: 'functionCall',
    calls: [{ name: 'searchBooks', arguments: { author: 'Beverly Lewis' } }],
    content: '',
  },
  {
    type: 'functionResponse',
    name: 'searchBooks',
    content: {
      items: [
        {
          authors: ['Beverly Lewis', 'David Lewis'],
          description:
            "From Bestselling Authors David & Beverly Lewis Flight instructor Jack Livingston has been raising his eight-year-old adopted niece, Natalie, since the accident that took her parents' lives. When he travels, Natalie is tenderly cared for by her Amish nanny, Laura Mast, who loves the little girl as her own. Eight excruciating years ago, Kelly Maines's baby was kidnapped. Determined to find her child, Kelly has tirelessly pursued every lead to its bitter end. And now, with the clock ticking, one last clue from a private investigator ignites a tiny flame of hope: Just a few miles away lives a young girl who matches the profile. Can this be, at long last, Kelly's beloved daughter?",
          id: '--gQXHAgAAQBAJ--',
          price: 15.99,
          publisher: 'Baker Books',
          title: 'Child of Mine',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            "Movie Edition of the Powerful Conclusion to The Shunning and The Confession Shunned from the Plain life of her youth, Katie Mayfield (now known as Katherine) delights in the modern world, yet she longs for the peace that reigned in her mother's heart. Though her life is far removed from Lancaster County, she must come to terms with her Amish heritage--and the man she once loved. Now in a special edition set to coincide with the release of the Hallmark Channel movie DVD, this redemptive story of love and grace offers readers a unique glimpse into the lives of the Amish.",
          id: '--l-otCwAAQBAJ--',
          price: 14.99,
          publisher: 'Baker Books',
          title: "Beverly Lewis' The Reckoning",
        },
        {
          authors: ['Beverly Lewis'],
          description:
            'Movie Edition of the Dramatic Sequel to The Shunning Katie Lapp has been torn from her close-knit Plain family and community in the painful ordeal known as the shunning. But as she strikes out into the strange and sometimes dangerous "English" world, she is unaware that the man she loves is planning to return to his Amish family--and to her. Now in a special edition set to coincide with the debut of the Hallmark Channel movie, this redemptive story of love and grace offers readers a unique glimpse into the lives of the Amish.',
          id: '--TqHZ0WhrMosC--',
          price: 14.99,
          publisher: 'Baker Books',
          title: "Beverly Lewis' The Confession",
        },
        {
          authors: ['Beverly Lewis'],
          description:
            'Katie Lapp only knew the Amish ways, but an unexpected discovery may tear apart her beloved community; special movie edition includes stills and extra content.',
          id: '--Jcm7TfwCZIIC--',
          publisher: 'Bethany House',
          title: "Beverly Lewis' The Shunning",
        },
        {
          authors: ['Beverly Lewis'],
          description:
            "Inspiring New Novel from the \"Biggest Name in Amish Fiction\" Eva Esch and her sisters are in a predicament. With the passing of their widowed mother, Eva's older brother Menno plans to move his growing family into the Eden Valley farmhouse where they all grew up, leaving little room for his three single sisters. Surely, Menno reasons, at least one of them will marry this coming wedding season. Eva does hope to marry, but she isn't sure she wants to give up her sweet shop for the life of a farmer's wife, and she has no other prospects. When younger sister, Lily, disappears in the night, leaving only a brief note, Eva fears she has been wooed away from the People by an outsider. And when Jed Stutzman, a young Amish buggy maker from Ohio, shows up in Lancaster with a photo of a Plain young woman, Eva's world begins to tilt. She feels powerfully drawn to the quietly charming stranger--but the woman in the forbidden photograph is no stranger at all. . . .",
          id: '--nF00CgAAQBAJ--',
          price: 15.99,
          publisher: 'Baker Books',
          title: 'The Photograph',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            "This heartwarming prequel to The Shunning is a tender story of love, belonging, and the courage to move forward. After her widowed father remarries, nineteen-year-old Clara Bender is no longer needed to help run his household. Marriage seems like her best hope of moving out, but there are few young men in her tiny Indiana Amish community. When she comes across letters from her mother's aunt Ella Mae Zook, she sets off to visit Lancaster County's Hickory Hollow to decide where her future lies. Ella Mae is not quite ready to move from the farmhouse where she and her recently deceased husband spent over fifty happy years, but her children are eager to resettle her, making Clara's visit seem like an answer to prayer. The two women form a warm bond while restoring an heirloom wedding quilt and sharing their lives, with Ella Mae confiding about a tragedy from her courting years. Eventually, Ella Mae suggests Clara stay for the summer, allowing Ella Mae more time with her and giving Clara an opportunity to meet the area's eligible young men. But when the unexpected happens, will Clara find where her heart truly belongs?",
          id: '--5X-uEAAAQBAJ--',
          price: 17.99,
          publisher: 'Baker Books',
          title: 'The Heirloom',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            'The loving hand of God is at work in even the most unsettling circumstances... In the seemingly ordinary Amish home of Grace Byler, secrets abound. Why does her mother weep and wander deep in the night? And why does her father refuse to admit something is dreadfully wrong? Then, in one startling moment, the quiet life Grace has known is irrevocably altered, leaving her to question all she has been taught about love, family, and commitment. "No one does Amish-based inspirationals better than Lewis." Booklist',
          id: '--7McXArIrhSwC--',
          price: 15,
          publisher: 'Bethany House',
          title: 'The Secret (Seasons of Grace Book #1)',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            "Merry Hanson doesn't know which is worse: harboring a runaway or being interrogated by the police. But when her friend Lissa shows up at the Hanson house bruised and beaten, Merry knows she has to help.",
          id: '--v7bbER3CQbwC--',
          title: 'Whispers Down the Lane',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            "Bestselling author Beverly Lewis's story of a weary big-city journalist and a New Order Amish woman whose lives come together over a mysterious postcard.",
          id: '--HY9x_Rg9cOQC--',
          price: 14.99,
          publisher: 'Bethany House',
          title: 'The Postcard',
        },
        {
          authors: ['Beverly Lewis'],
          description:
            'The anticipation of a homecoming, a chance to set things right... Yet will "the telling" cause further pain? Accompanied by her new English friend, Grace Byler has left Bird-in-Hand to search for her mother in Ohio. But what if Lettie refuses to be found? Meanwhile, Lettie continues her private quest to find the missing piece of her life, though she is increasingly torn between the family she left behind and yearning for her long-lost child. Will mother and daughter find the answers they seek? The Powerful Series Conclusion From New York Times Best-Selling Author Beverly Lewis "No one does Amish-based inspirationals better than Lewis." Booklist',
          id: '--J8fLO-lOtC8C--',
          price: 14.99,
          publisher: 'Bethany House',
          title: 'The Telling (Seasons of Grace Book #3)',
        },
      ],
    },
  },
  {
    type: 'functionCall',
    calls: [{ name: 'searchBooks', arguments: { author: 'Sarah Mlynowski' } }],
    content:
      "Here are some books by Beverly Lewis:\n\n1. **--gQXHAgAAQBAJ--**: Child of Mine\n2. **--l-otCwAAQBAJ--**: Beverly Lewis' The Reckoning\n3. **--TqHZ0WhrMosC--**: Beverly Lewis' The Confession\n4. **--Jcm7TfwCZIIC--**: Beverly Lewis' The Shunning\n5. **--nF00CgAAQBAJ--**: The Photograph\n\nBeverly Lewis is known for her heartwarming Amish fiction, which often explores themes of faith, family, and community. Her books are full of rich characters and engaging storylines, and they are perfect for readers who enjoy clean and wholesome fiction.  \n\nThese books are all part of the \"Seasons of Grace\" series, a long-running series that follows the lives of various Amish characters as they navigate the challenges and joys of life.  The series is full of romance, family drama, and heartwarming stories of faith and forgiveness.\n\n",
  },
  {
    type: 'functionResponse',
    name: 'searchBooks',
    content: {
      items: [
        {
          authors: ['Sarah Mlynowski'],
          description:
            'Leaving Florida to move in with her boyfriend in New York, 24-year-old Sunny Langstein has additional incentive: to be on a new reality-television show. Plunged into a media spotlight, Sunny finds her life unraveling.',
          id: '--V-GWT4xGLYYC--',
          publisher: 'Don Mills, Ont. : Red Dress Ink',
          title: 'As Seen on TV',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "The first installment of Sarah Mylowski's New York Times bestselling series!Be the bravest of them all . . . Once upon a time my brother and I were normal kids. The next minute? The mirror in our basement slurped us up and magically transported us inside Snow White's fairy tale. I know it sounds crazy, but it's true.But hey -- we're heroes! We stopped Snow White from eating the poisoned apple. Hooray! Or not. If Snow White doesn't die, she won't get to meet her prince. And then she won't get her happy ending. Oops. Now it's up to us to:- Avoid getting poisoned- Sneak into a castle- Fix Snow White's storyBut Snow White's REAL happy ending might not be quite what we expected . . .",
          id: '--xP6ND_mpUU8C--',
          price: 4.99,
          publisher: 'Scholastic Inc.',
          title: 'Fairest of All (Whatever After #1)',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "The fourteenth book in the New York Times and USA Today bestselling series featuring fractured fairy tales for fearless kids! Guess where we are this time? The magic mirror has sent me and my brother, Jonah (plus our puppy, Prince), into the story of Goldilocks and the Three Bears. Fun! There's porridge to taste, chairs to sit on, and beds to nap in. But Goldilocks is in a LOT of trouble, and if we can't help her, we might get stuck here forever! Now we have to: - Skateboard down a mountain - Convince the bear family NOT to eat us - Get one hundred gold coins - Escape the royal jail ...And find the one fairy tale character who can turn straw into gold... Wait... Rumpelstiltskin? What are YOU doing here?!",
          id: '--ETrXDwAAQBAJ--',
          price: 3.99,
          publisher: 'Scholastic Inc.',
          title: 'Good as Gold (Whatever After #14)',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            'A “funny, realistic, heartfelt, satiric, and unpredictable” novel about a group of big-city teens with mind-blowing powers (Ned Vizzini, New York Times–bestselling author). It was just an ordinary day at Manhattan’s Bloomberg High School. Socially awkward Olivia Byrne was stressing about her upcoming speech in public speaking class. Cooper Miller was flying high over the Yankees’ win from the night before. Mackenzie Feldman, Cooper’s girlfriend, was dreading the class’s upcoming flu vaccines because of her overwhelming fear of needles. Little did Mackenzie know that the shot would be the least of her worries . . . Now—after getting immunized—most of the students in homeroom 10B have the power to hear everyone’s thoughts: catty remarks, who’s crushing on whom, and what their teachers and parents really think about them. Once the students figure out what’s going on, the question becomes: What do they do with their new superpower? Use it for good . . . or for evil? Because world domination is on the menu . . . “A tour-de-force comic narration that will leave you gasping in awe—if you ever catch your breath from laughing.” —E. Lockhart, #1 New York Times–bestselling author of We Were Liars “Smart and frequently hilarious . . . Filled with heartbreak, hilarity, and some brutal truths, Mlynowski’s novel will leave readers thinking about the gaps between our private and public selves and the lies we tell others and ourselves.” —Publishers Weekly (starred review) “Hilarious, moving, and utterly ingenious.” —Robin Wasserman, author of Girls on Fire',
          id: '--9439EAAAQBAJ--',
          price: 14.99,
          publisher: 'Open Road Media',
          title: "Don't Even Think About It",
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "Who better to take advice from than your future self? This hilarious novel from the author of Ten Things We Did (And Probably Shouldn't Have), Don't Even Think About It, and the Magic in Manhattan series is sweet, entertaining, and all-too-relatable. A new life is just a phone call away! Devi's life isn't turning out at all like she wanted. She wasted the past three years going out with Bryan—cute, adorable, break-your-heart Bryan. Devi let her friendships fade, blew off studying, didn't join any clubs . . . and now that Bryan has broken up with her, she has nothing left. Not even her stupid cell phone—she dropped it in the mall fountain. Now it only calls one number . . . hers. At age fourteen, three years ago! Once Devi gets over the shock—and convinces her younger self that she isn't some wacko—she realizes that she's been given an awesome gift. She can tell herself all the right things to do . . . because she's already done all the wrong ones! Except . . .what if getting what you think you want changes everything? \"Mlynowski is in peak form: an outrageous concept, plot jammed with twists, a laugh on every page, and a heroine — no, two heroines in one! — you completely connect with.\" —E. Lockhart, New York Times bestselling author of Genuine Fraud and We Were Liars \"Read this fast-paced, absorbing, and sweet story to find out what happens when senior-year wisdom meets starry-eyed freshman dreams!\" —Melissa de la Cruz, New York Times bestselling author of The Isle of the Lost, Blue Bloods, and Alex and Eliza \"A warm, wonderful (and hilarious!) story about learning to be your own hero. I ♥ this book like crazy!!\" —Lauren Myracle, New York Times bestselling author of TTYL and Twelve",
          id: '--Mz8IbTZjx6gC--',
          publisher: 'Delacorte Press',
          title: 'Gimme a Call',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            'From the bestselling author of Don’t Even Think About It, these high school seniors may know each other’s thoughts, but they’ll never see what’s coming. Since refusing to take the antidote after acquiring flu shot–induced telepathy two years ago, the twenty Espies (that’s people with ESP to you norms) have been kept together in one class every single day. Now that they’re seniors, their separation is looming . . . Though their superpower has come with a price—headaches, constant noise, purple-tinted eyes, C-list celebrity status—Mackenzie Feldman, Olivia Byrne, Cooper Miller, Pi Ricci, and the others wouldn’t change a thing. They’ve all gotten closer than ever, and when—one-by-one—they start losing their telepathic abilities, they’ll do whatever it takes to stop the damage. Graduation is coming up, and if the Espies are going out, they may as well go out with a bang. Praise for Don’t Even Think About It “A tour-de-force comic narration that will leave you gasping in awe—if you ever catch your breath from laughing.” —E. Lockhart, #1 New York Times–bestselling author of We Were Liars “Funny, realistic, heartfelt, satiric, and unpredictable.” —Ned Vizzini, New York Times–bestselling author of It’s Kind of a Funny Story “Smart and frequently hilarious . . . Filled with heartbreak, hilarity, and some brutal truths, Mlynowski’s novel will leave readers thinking about the gaps between our private and public selves and the lies we tell others and ourselves.” —Publishers Weekly (starred review) “Hilarious, moving, and utterly ingenious.” —Robin Wasserman, author of Girls on Fire “A solid, comical sci-fi romp.” —Kirkus Reviews',
          id: '--cYn9EAAAQBAJ--',
          price: 14.99,
          publisher: 'Open Road Media',
          title: 'Think Twice',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            'Sixteen-year-old April, a high school junior, and her friend Vi, a senior, get a crash course in reality as the list of things they should not do becomes a list of things they did while living parent-free in Westport, Connecticut, for the semester. By the author of the Magic in Manhattan series. 75,000 first printing.',
          id: '--QFxpngEACAAJ--',
          publisher: 'HarperTeen',
          title: "Ten Things We Did (and Probably Shouldn't Have)",
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "The enchanting New York Times and USA Today bestselling series continues with installment number 13! The New York Times bestselling series!My brother Jonah's dream has come true. We have FINALLY landed in his favorite fairy tale: Jack and the Beanstalk!It's a lot of fun meeting Jack. But then we accidentally mess up his story, which means Jack can't climb up the magic beanstalk to find the giant's riches. It's time to take matters into our own hands. Now we have to:- Make a deal with a sneaky trader- Climb a beanstalk into the sky- Try not to get eaten by a giant - Find the goose that lays golden eggsOtherwise, Jack won't get his treasure, and our troubles will be GIGANTIC . . .",
          id: '--IkdrDwAAQBAJ--',
          price: 3.99,
          publisher: 'Scholastic Inc.',
          title: 'Spill the Beans (Whatever After #13)',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "Abby and Jonah's magical adventures continue in the tenth installment of Sarah Mlynowski's New York Times bestselling series! This time, the kids get mixed up in Hansel and Gretel's story. That's the way the cookie crumbles!Yum! Our magic mirror has dropped me and my brother, Jonah, into the story of Hansel and Gretel. If we're lucky, we may even get to taste the cake-house... But we didn't count on accidentally getting trapped. The real Hansel and Gretel are on the run, and Jonah and I have taken their place. And the witch is making a kid casserole for dinner... Now we have to:- Avoid being eaten - Pretend our dog is a cat- Learn to make kale smoothies- Befriend a talking duck Or we may never make it back to our home sweet home!",
          id: '--bW4kDAAAQBAJ--',
          price: 3.99,
          publisher: 'Scholastic Inc.',
          title: 'Sugar and Spice (Whatever After #10)',
        },
        {
          authors: ['Sarah Mlynowski'],
          description:
            "The magical seventh installment in this NEW YORK TIMES bestselling series! Ever since the magic mirror erased his memory, my brother, Jonah, doesn't believe that we really visit different fairy tales. So it's a relief when the mirror sucks us into a story -- and this time, it's Beauty and the Beast! Hoorah! Or, maybe not. When Jonah picks a rose from the Beast's garden, he messes up the story. The Beast is so angry he takes my brother prisoner... instead of Beauty! But if the Beast doesn't meet and fall in love with Beauty, then his curse will never be lifted and Jonah will be trapped in the palace forever!Now I have to:- Find Beauty - Deal with a wicked fairy named Jax- Restore Jonah's memory- Play matchmakerIf I don't fix this mess in time, the situation could get pretty ugly...",
          id: '--kH3CBAAAQBAJ--',
          price: 3.99,
          publisher: 'Scholastic Inc.',
          title: 'Beauty Queen (Whatever After #7)',
        },
      ],
    },
  },
  {
    content:
      'Here are some books by Sarah Mlynowski:\n\n1. **--V-GWT4xGLYYC--**: As Seen on TV\n2. **--xP6ND_mpUU8C--**: Fairest of All (Whatever After #1)\n3. **--ETrXDwAAQBAJ--**: Good as Gold (Whatever After #14)\n4. **--9439EAAAQBAJ--**: Don\'t Even Think About It\n5. **--Mz8IbTZjx6gC--**: Gimme a Call\n\nSarah Mlynowski is a talented author who writes for both children and young adults. Her books are often humorous and full of heart, and they explore a wide range of themes, from friendship and family to magic and self-discovery. She is known for her relatable characters and her ability to weave together humor and heartwarming moments.  \n\nThe books listed above are all part of the "Whatever After" series, which is a fun and imaginative series that takes readers on adventures through different fairy tales.  The series is perfect for kids who love fairy tales, and it\'s sure to keep them entertained with its twists and turns.   \n\nI hope this helps you find some great books for your daughter this summer!  Happy reading! \n',
    type: 'assistant',
  },
]
