import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  {
    content:
      "Ready to discover your next favorite read? Whether you're looking for your next page-turner, a thoughtful gift, or the perfect book for your little one, I'm your dedicated book guide. Tell me a little bit about who the book is for and what you're looking for, or any other preferences you have. Let's embark on a literary adventure together!",
    type: 'assistant',
  },
  {
    content:
      'do you know of any authors similar to the author of the Princess in Black books?',
    type: 'user',
  },
  {
    content:
      '"The Princess in Black" series is written by Shannon Hale and Dean Hale, and it\'s known for its engaging characters and humor. If you\'re looking for authors with a similar style, here are some suggestions:\n\n1. **Dav Pilkey** - Known for the "Dog Man" and "Captain Underpants" series, his books are filled with humor and adventure.\n2. **Mo Willems** - Famous for the "Pigeon" books and "Elephant & Piggie" series, Willems has a playful and engaging writing style that resonates with younger readers.\n3. **Jeff Kinney** - Author of the "Diary of a Wimpy Kid" series, Kinney\'s books are relatable and funny, appealing to middle-grade readers.\n4. **Kate DiCamillo** - While her style may be a bit more whimsical, her books like "The Tale of Despereaux" and "Because of Winn-Dixie" incorporate adventure and heart.\n5. **Liz Kessler** - Known for her "Emily Windsnap" series, Kessler blends fantasy with lovely storytelling.\n\nWould you like to explore books by any of these authors, or do you have any specific preferences in mind?',
    type: 'assistant',
  },
  {
    content:
      "yeah i'm looking for books for middle-grade readers. Any other authors besides Jeff Kinney?",
    type: 'user',
  },
  {
    content:
      'Absolutely! Here are some fantastic authors who write for middle-grade readers, known for their captivating stories and engaging writing styles:\n\n1. **Rick Riordan** - Famous for the "Percy Jackson & The Olympians" series, Riordan combines mythology with modern adventure.\n2. **Roald Dahl** - Known for classics like "Matilda," "Charlie and the Chocolate Factory," and "James and the Giant Peach," his stories are imaginative and often have a twist of humor.\n3. **Lisa McMann** - Author of the "Wake" series and "The Unwanteds," her books take readers on fantastical journeys with unique plots.\n4. **Cornelia Funke** - Best known for "Inkheart" and "The Thief Lord," Funke\'s writing is rich with magical elements and adventure.\n5. **Andrew Clements** - Known for books like "Frindle" and "The Landry News," he explores themes of creativity and school life with wit and warmth.\n\nWould you like me to search for books by any specific authors from this list or explore other middle-grade genres? Let me know how I can help!',
    type: 'assistant',
  },
  {
    content:
      "I don't think my daughter is into the magical or fantasy genre. What other authors? Jeff Kinney still seems like the leading candidate",
    type: 'user',
  },
  {
    content:
      'If your daughter prefers more realistic stories rather than magical or fantasy elements, here are some great authors who write relatable, humorous, and engaging middle-grade fiction:\n\n1. **James Patterson** - Known for the "Middle School" series, his books are funny and often feature relatable school experiences.\n2. **Sharon Creech** - Author of "Walk Two Moons" and "Absolutely Normal Chaos," her stories focus more on real-life circumstances and emotional growth.\n3. **Barbara Park** - Famous for the "Junie B. Jones" series, these books present the daily adventures of a spunky young girl in a humorous way.\n4. **Kate DiCamillo** - While she occasionally mixes in some whimsy, her works like "The Miraculous Journey of Edward Tulane" are grounded in real emotions and relationships.\n5. **Raina Telgemeier** - Known for graphic novels like "Smile" and "Sisters," she tells relatable coming-of-age stories with humor and warmth.\n\nWould you like to see some specific book recommendations from any of these authors, or do you have any other preferences in mind?',
    type: 'assistant',
  },
  {
    content: 'ok, show me the top books by Jeff, James, Barbara & Raina',
    type: 'user',
  },
  {
    calls: [
      {
        id: 'call_w7KhWDSpXmMIwT8C6h6lVSOx',
        name: 'searchBooks',
        arguments: { author: 'Jeff Kinney', genre: 'Juvenile Fiction' },
      },
      {
        id: 'call_l8U7I1u8Bxm3dBcyGESMv1aj',
        name: 'searchBooks',
        arguments: {
          author: 'James Patterson',
          genre: 'Juvenile Fiction',
        },
      },
      {
        id: 'call_pyW5b0Dnq3XoyQLkDHm7taeZ',
        name: 'searchBooks',
        arguments: { author: 'Barbara Park', genre: 'Juvenile Fiction' },
      },
      {
        id: 'call_aVVeEzE7NvdJltemRl4f65xW',
        name: 'searchBooks',
        arguments: {
          author: 'Raina Telgemeier',
          genre: 'Juvenile Fiction',
        },
      },
    ],
    content: null,
    type: 'functionCall',
  },
  {
    name: '',
    content: {
      items: [
        {
          authors: ['Jeff Kinney'],
          description:
            'Boys don’t keep diaries—or do they? The launch of an exciting and innovatively illustrated new series narrated by an unforgettable kid every family can relate to It’s a new school year, and Greg Heffley finds himself thrust into middle school, where undersized weaklings share the hallways with kids who are taller, meaner, and already shaving. The hazards of growing up before you’re ready are uniquely revealed through words and drawings as Greg records them in his diary. In book one of this debut series, Greg is happy to have Rowley, his sidekick, along for the ride. But when Rowley’s star starts to rise, Greg tries to use his best friend’s newfound popularity to his own advantage, kicking off a chain of events that will test their friendship in hilarious fashion. Author/illustrator Jeff Kinney recalls the growing pains of school life and introduces a new kind of hero who epitomizes the challenges of being a kid. As Greg says in his diary, “Just don’t expect me to be all ‘Dear Diary’ this and ‘Dear Diary’ that.†? Luckily for us, what Greg Heffley says he won’t do and what he actually does are two very different things. Since its launch in May 2004 on Funbrain.com, the Web version of Diary of a Wimpy Kid has been viewed by 20 million unique online readers. This year, it is averaging 70,000 readers a day. F&P level: T',
          id: '--8MXK_KrHOZYC--',
          price: 13.49,
          publisher: 'Abrams',
          title: 'Diary of a Wimpy Kid (Diary of a Wimpy Kid #1)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            'While trying to find a new best friend after feuding with Rowley, middle-school slacker Greg Heffley is warned by older family members that adolescence is a time to act more responsibly and to think seriously about his future.',
          id: '--aY0tAwEACAAJ--',
          publisher: 'Harry N. Abrams',
          title: 'The Ugly Truth',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            'Greg Heffley has always been in a hurry to grow up. But is getting older really all it’s cracked up to be? Greg suddenly finds himself dealing with the pressures of boy-girl parties, increased responsibilities, and even the awkward changes that come with getting older—all without his best friend, Rowley, at his side. Can Greg make it through on his own? Or will he have to face the “ugly truth”?',
          id: '--BTM7iwk64VgC--',
          price: 13.49,
          publisher: 'Abrams',
          title: 'The Ugly Truth (Diary of a Wimpy Kid #5)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            'Greg Heffley is in big trouble. School property has been damaged, and Greg is the prime suspect. But the crazy thing is, he’s innocent. Or at least sort of. The authorities are closing in, but when a surprise blizzard hits, the Heffley family is trapped indoors. Greg knows that when the snow melts he’s going to have to face the music, but could any punishment be worse than being stuck inside with your family for the holidays?',
          id: '--HKmkHMhcfNEC--',
          price: 13.49,
          publisher: 'Abrams',
          title: 'Cabin Fever (Diary of a Wimpy Kid #6)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            "Up until now, middle school hasn't exactly been a joyride for Greg Heffley. So when the town threatens to close the crumbling building, he's not too broken up about it. But when Greg realizes this means he's going to be sent to a different school tha",
          id: '--Aw8Y0AEACAAJ--',
          title: 'No Brainer',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            'An instant #1 USA Today, Wall Street Journal, and New York Times bestseller! In The Deep End, book 15 of the Diary of a Wimpy Kid series from #1 international bestselling author Jeff Kinney, Greg Heffley and his family hit the road for a cross-country camping trip, †‹ready for the adventure of a lifetime. But things take an unexpected turn, and they find themselves stranded at an RV park that’s not exactly a summertime paradise. When the skies open up and the water starts to rise, the Heffleys wonder if they can save their vacation—or if they’re already in too deep. And don’t miss Rowley Jefferson’s Awesome Friendly Adventure, an all-new fantasy from Greg’s best friend—the follow-up to the instant #1 bestseller Diary of an Awesome Friendly Kid: Rowley Jefferson’s Journal.',
          id: '--SkDQDwAAQBAJ--',
          price: 13.49,
          publisher: 'Abrams',
          title: 'The Deep End (Diary of a Wimpy Kid Book 15)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            "Boys don't keep diaries -- or do they? The launch of an exciting and innovatively illustrated new series narrated by an unforgettable kid every family can relate to. It's a new school year, and Greg Heffley finds himself thrust into middle school, where undersized weaklings share the hallways with kids who are taller, meaner, and already shaving. The hazards of growing up before you're ready are uniquely revealed through words and drawings as Greg records them in his diary. In book one of this debut series, Greg is happy to have Rowley, his sidekick, along for the ride. But when Rowley's star starts to rise, Greg tries to use his best friend's newfound popularity to his own advantage, kicking off a chain of events that will test their friendship in hilarious fashion. Author/illustrator Jeff Kinney recalls the growing pains of school life and introduces a new kind of hero who epitomizes the challenges of being a kid. As Greg says in his diary, \"Just don't expect me to be all 'Dear Diary' this and 'Dear Diary' that.\" Luckily for us, what Greg Heffley says he won't do and what he actually does are two very different things.",
          id: '--KztRnvGJs9oC--',
          title: 'Diary of a Wimpy Kid',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            'The highly anticipated third book in the critically acclaimed and bestselling series takes the art of being wimpy to a whole new level. Let’s face it: Greg Heffley will never change his wimpy ways. Somebody just needs to explain that to Greg’s father. You see, Frank Heffley actually thinks he can get his son to toughen up, and he enlists Greg in organized sports and other “manly†? endeavors. Of course, Greg is able to easily sidestep his father’s efforts to change him. But when Greg’s dad threatens to send him to military academy, Greg realizes he has to shape up . . . or get shipped out. Greg and his family and friends, who make the Diary of a Wimpy Kid books a must-read for middle school readers, are back and at their best in this hilarious new installment of the series, which is sure to please current fans while attracting new ones. Publishers Weekly-1/19/2009: The third book in this genre-busting series is certain to enlarge Kinney’s presence on the bestseller lists, where the previous titles have taken up residence for the past two years. Kinney’s spot-on humor and winning formula of deadpan text set against cartoons are back in full force. This time, Greg starts off on New Year’s Day (he resolves to “help other people improve,†? telling his mother, “I think you should work on chewing your potato chips more quietly†?) and ends with summer vacation. As he fends off his father’s attempts to make him more of a man (the threat of military school looms), Greg’s hapless adventures include handing out anonymous valentines expressing his true feelings (“Dear James, You smell†?), attempting to impress his classmate Holly and single-handedly wrecking his soccer team’s perfect season. Kinney allows himself some insider humor as well, with Greg noting the “racket†? children’s book authors have going. “All you have to do is make up a character with a snappy name, and then make sure the character learns a lesson at the end of the book.†? Greg, self-centered as ever, may be the exception proving that rule. Ages 8†“12. (Jan.) F&P level: T',
          id: '--o_xMoYgLUoEC--',
          price: 13.49,
          publisher: 'Abrams',
          title: 'The Last Straw (Diary of a Wimpy Kid #3)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            "A family road trip is supposed to be a lot of fun . . . unless, of course, you're the Heffleys. The journey starts off full of promise, then quickly takes several wrong turns. Gas station bathrooms, crazed seagulls, a fender bender, and a runaway pig--not exactly Greg Heffley's idea of a good time. But even the worst road trip can turn into an adventure--and this is one the Heffleys won't soon forget.",
          id: '--rLyExgEACAAJ--',
          publisher: 'Amulet Books',
          title: 'The Long Haul (Diary of a Wimpy Kid #9)',
        },
        {
          authors: ['Jeff Kinney'],
          description:
            "In The Deep End, book 15 of the Diary of a Wimpy Kid series from #1 international bestselling author Jeff Kinney, Greg Heffley and his family hit the road for a cross-country camping trip, ​ready for the adventure of a lifetime. But things take an unexpected turn, and they find themselves stranded at an RV park that's not exactly a summertime paradise. When the skies open up and the water starts to rise, the Heffleys wonder if they can save their vacation--or if they're already in too deep. And don't miss Rowley Jefferson's Awesome Friendly Adventure, an all-new fantasy from Greg's best friend--the follow-up to the instant #1 bestseller Diary of an Awesome Friendly Kid: Rowley Jefferson's Journal.",
          id: '--GyNKzQEACAAJ--',
          publisher: 'Amulet Books',
          title: 'Diary of a Wimpy Kid #15',
        },
      ],
    },
    id: 'call_w7KhWDSpXmMIwT8C6h6lVSOx',
    type: 'functionResponse',
  },
  {
    name: '',
    content: {
      items: [
        {
          authors: ['James Patterson'],
          description:
            "James Patterson's blockbuster Alex Cross series has sold over 100 million copies – and now he's bringing those thrills to a new generation! Alex's son Ali is eager to follow in his father's footsteps as a detective, but when his best friend goes missing, what price will he have to pay to solve the mystery? Ali Cross has always looked up to his father, former detective and FBI agent Alex Cross. While solving some of the nation's most challenging crimes, his father always kept his head and did the right thing. Can Ali have the same strength and resolve? When Ali's best friend Gabe is reported missing, Ali is desperate to find him. At the same time, a string of burglaries targets his neighborhood -- and even his own house. With his father on trial for a crime he didn't commit, it's up to Ali to search for clues and find his friend. But being a kid sleuth isn't easy -- especially when your father warns you not to get involved! -- and Ali soon learns that clues aren't always what they seem. Will his detective work lead to a break in Gabe's case or cause even more trouble for the Cross family?",
          id: '---IKLDwAAQBAJ--',
          price: 8.99,
          publisher: 'jimmy patterson',
          title: 'Ali Cross',
        },
        {
          authors: ['James Patterson', 'Keir Graff'],
          description:
            "Mystery, danger, intrigue—all in a day's work for MK's Detective Club! Don't miss the first book in this funny, smart, and action-packed new series from beloved #1 bestselling author James Patterson. Living in the luxurious Arcanum building—with its interior balconies perfect for playing tag, an elevator like an iron birdcage, and quirky neighbors behind every apartment door—has always been fun and games for twelve-year-old Minerva Keen … until her neighbors start getting poisoned. Anyone could be next, and everyone is a suspect, including Minerva herself. To clear her name and help the police crack the case, Minerva starts her own detective club. So what if it has only two other members, one being Minerva’s accident-prone daredevil brother and the other being the biggest and quietest kid in school, who happens to be afraid of his own shadow? Minerva knows that with her brainpower, the club’s sleuthing skills, and case files full of suspects, they can unmask the poisoner … hopefully before it’s too late. This page-turning new mystery series is packed with thrills, chills, laughs, and unforgettable characters and will leave kids eager to join the best club around. Published in hardcover as Minerva Keen’s Detective Club",
          id: '--oEiHEAAAQBAJ--',
          publisher: 'jimmy patterson',
          title: "Minerva Keen's Detective Club",
        },
        {
          authors: ['James Patterson'],
          description:
            'This digital sampler contains excerpts from four books for kids by bestselling author James Patterson, including Middle School: The Worst Years of My Life, I Funny, Treasure Hunters, and a brand new story coming in November, House of Robots!',
          id: '--24oFBAAAQBAJ--',
          publisher: 'jimmy patterson',
          title:
            "James Patterson's Bestselling Kids' Series -- Chapter Sampler",
        },
        {
          authors: ['James Patterson', 'Lisa Papademetriou'],
          description:
            'In James Patterson\'s first highly illustrated "diary fiction" story for teens, the mega-bestselling author\'s most endearing and original teen heroine ever proves that everyone can use a helping hand once in a while. Margaret "Cuckoo" Clarke recently had a brief stay in a mental institution following an emotional breakdown, but she\'s turning over a new leaf with her "Operation Happiness". She\'s determined to beat down the bad vibes of the Haters, the Terror Teachers, and all of the trials and tribulations of high school by writing and drawing in her diary. And when life gets really tough, she works through her own moments of uncertainty through imaginary conversations with her favorite literary characters. Cuckoo\'s also got a nearly impossible mission: she, along with her misfit band of self-deprecating friends (who call themselves "the Freakshow") decide to bridge the gap between warring cliques and "bring the Nations together". Not everyone is so willing to join hands and get along, but Cuckoo never stops smiling... until one of her closest friends, pushed to desperation by a Hater prank, decides that enough is enough.',
          id: '--0a08AwAAQBAJ--',
          publisher: 'jimmy patterson',
          title: 'Homeroom Diaries - FREE PREVIEW (First 6 Chapters)',
        },
        {
          authors: ['James Patterson'],
          description:
            "Alex Cross’s son Ali is an accomplished mystery-solver and #1 bestseller. A crime at a concert near his school sparks his newest investigation, and it gets dangerous fast. Sometimes it’s good to have a father in the detective business. ​ Ali Cross just solved his first real case. Alex Cross knows it's only a matter of time before his son finds his way into more trouble. Neither of them expected Ali to get caught up in another case so quickly. Ali and his friends were just hanging out in Anacostia Park . . . then they became witnesses to a crime. Alex wants Ali to stay far away from the investigation. But Ali isn't going anywhere, not when his new friend Zoe is in trouble. It's up to Ali to figure out why she's lying to the police—and who she's protecting. This is Ali's toughest case yet. As long as he trusts his Cross instincts, he may just have a shot at solving it . . .",
          id: '--P7oCEAAAQBAJ--',
          price: 7.99,
          publisher: 'jimmy patterson',
          title: 'Ali Cross: Like Father, Like Son',
        },
        {
          authors: ['James Patterson'],
          description:
            "The #1 bestselling kid detective is back! Mysteries, crime-solving, homeroom—all in a day's work for Ali Cross. Ali Cross has always looked up to his father, the famous detective Alex Cross. And after helping to solve two big cases, Ali knows he has what it takes to follow in his father's footsteps. Eager to keep solving crimes, Ali and his friends hack into police calls and go to crime scenes to watch the detectives at work—and try to crack the cases themselves. But when Ali witnesses something horrible, he has to grapple with tough questions about what it means to be a detective and a detective's son. Will Ali find a way to follow in his father’s footsteps . . . or will he be the one in danger’s path?",
          id: '--LlpHEAAAQBAJ--',
          price: 9.99,
          publisher: 'jimmy patterson',
          title: 'Ali Cross: The Secret Detective',
        },
        {
          authors: ['James Patterson'],
          id: '--Eps3AAAACAAJ--',
          title: "School's Out - Forever",
        },
        {
          authors: ['James Patterson'],
          id: '--H1jbrQEACAAJ--',
          title: 'The Worst Years of My Life',
        },
        {
          authors: ['James Patterson', 'Chris Grabenstein'],
          description:
            "Get ready to Laugh Out Loud (a lot!) with James Patterson's illustrated middle grade story of a twelve-year-old boy starting his own book company for kids. Jimmy loves reading so much that he's inspired to start a book company for kids -- run by kids. It's a big dream for a twelve-year-old boy. Some would even say it's laugh-out-loud ridiculous! But that doesn't stop Jimmy from dreaming even bigger! His company will be as imaginative and fun as Willy Wonka's chocolate factory . . . with a Ferris wheel instead of an elevator, a bowling alley in the break room, and a river filled with floating books! He just has to believe in himself and his idea (and maybe win the Lotto). In this hilarious story filled with clever references to children's book favorites, James Patterson shows young readers that anything can be achieved if you believe in yourself no matter what!",
          id: '--nWenDQAAQBAJ--',
          price: 9.99,
          publisher: 'Jimmy Patterson',
          title: 'Laugh Out Loud',
        },
        {
          authors: ['James Patterson'],
          description:
            "One viral photo. Four expelled teens. Everyone's a suspect. Theo Foster’s Twitter account used to be anonymous – until someone posted a revealing photo that got him expelled. No final grade. No future. Theo’s resigned himself to a life of misery in a dead-end job when a miracle happens: Sasha Ellis speaks to him. She was also expelled for a crime she didn’t commit, and now he has the perfect way to keep her attention: find out who set them up. To uncover the truth, Theo has to get close to the suspects. What secrets are they hiding? And how can he catch their confessions on camera...?",
          id: '--bOMnDwAAQBAJ--',
          publisher: 'Random House',
          title: 'Expelled',
        },
      ],
    },
    id: 'call_l8U7I1u8Bxm3dBcyGESMv1aj',
    type: 'functionResponse',
  },
  {
    name: '',
    content: {
      items: [
        {
          authors: ['Barbara Park'],
          description:
            "In this sequel to Don't Make Me Smile, Charlie Hickle's life has become a three-ring circus. Why did his mom have to get remarried anyway? He wants things back the way they used to be—right now!",
          id: '--tzdCDUgReIkC--',
          price: 6.99,
          publisher: 'Yearling',
          title: 'My Mother Got Married and Other Disasters',
        },
        {
          authors: ['Barbara Park'],
          description:
            "\"Don't even try to make me smile about this,\" Charlie Hickle warns his parents. They've just dropped a major bombshell: They're getting a divorce -- and they expect him to be happy for them! Well, Charlie has some big news for Mom and Dad: he's not going to let them get away with this! Instead of being cheerful, he launches a campaign to show them how he really feels. He refuses to eat this mother's cooking. He causes trouble in school. He makes nasty remarks about his father's shabby new apartment. But no matter what he does, his parents just don't seem to get the picture. Isn't it obvious they're ruining his life?",
          id: '--MR6PQh1yjvIC--',
          price: 6.99,
          publisher: 'Yearling',
          title: "Don't Make Me Smile",
        },
        {
          authors: ['Barbara Park'],
          description:
            '“Hilarious. Barbara Park makes reading fun.” —Dav Pilkey, author of Dog Man Get ready to go back to school with Junie B. Jones! The World’s Funniest Kindergartener is now officially a first grader! The #1 New York Times bestselling chapter book series has been keeping kids laughing—and reading—for more than twenty-five years. Over 65 million copies sold! Hurray, hurray for a brand-new school year! Being in first grade means having to get used to a whole new classroom. And a whole new teacher. And a whole new bunch of strange children. But here’s the worst thing of all: When Junie B. tries to read words on the chalkboard, she can’t seem to see what everyone else is seeing! Is it possible she might actually end up wearing glasses?',
          id: '--6ZiODQAAQBAJ--',
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones #18: First Grader (at last!)',
        },
        {
          authors: ['Barbara Park'],
          description:
            'Earl is ready to do anything to avoid the meanest kid in school-even if it means playing dead.',
          id: '--yqxwO6N41RQC--',
          price: 4.99,
          publisher: 'Yearling',
          title: 'Dear God, Help!!! Love, Earl',
        },
        {
          authors: ['Barbara Park'],
          description:
            '“Hilarious. Barbara Park makes reading fun.” —Dav Pilkey, author of Dog Man Barbara Park’s #1 New York Times bestselling chapter book series, Junie B. Jones, has been keeping kids laughing—and reading—for more than twenty-five years. Over 65 million copies sold! Meet the World’s Funniest Kindergartner—Junie B. Jones! Lucille is having a sleepover party—at her richie nanna’s big giant house! Grace and Junie B. can’t wait to see all the rich stuff in that place. Sleeping over at the nanna’s is sure to be a dream come true! ’Cause what could possibly go wrong? USA Today: “Junie B. is the darling of the young-reader set.” Publishers Weekly: “Park convinces beginning readers that Junie B.—and reading—are lots of fun.” Kirkus Reviews: “Junie’s swarms of young fans will continue to delight in her unique take on the world. . . . A hilarious, first-rate read-aloud.” Time: “Junie B. Jones is a feisty six-year-old with an endearing penchant for honesty.”',
          id: '--63XLE6q95PoC--',
          price: 4.99,
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones #10: Junie B. Jones Is a Party Animal',
        },
        {
          authors: ['Barbara Park'],
          description:
            'In her own words, a young girl describes her feelings about starting kindergarten and what she does when she decides not to ride the bus home.',
          id: '--WgNlrNinOk4C--',
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones and the Stupid Smelly Bus',
        },
        {
          authors: ['Barbara Park'],
          description:
            "Poor Oscar Winkle! Ever since his little brother, Robert (not-so-affectionately known as Slobert), showed up seven and a half years ago, he's been specializing in ruining Oscar's life. So he comes up with Operation: Dump the Chump, a brilliant scheme to get even with the pesky creep.",
          id: '--0QLkpBVAeJsC--',
          price: 4.99,
          publisher: 'Yearling',
          title: 'Operation: Dump the Chump',
        },
        {
          authors: ['Barbara Park'],
          description:
            '“Hilarious. Barbara Park makes reading fun.” —Dav Pilkey, author of Dog Man Barbara Park’s #1 New York Times bestselling chapter book series, Junie B. Jones, has been keeping kids laughing—and reading—for more than twenty-five years. Over 65 million copies sold! Meet the World’s Funniest First Grader—Junie B. Jones! Something very wonderful is happening to Junie B. And it’s called—hurray, hurray!—she’s getting to be a professional lunch lady! And that means hanging out with Mrs. Gutzman in the cafeteria. And standing behind the counter. And even wearing a real actual hair net! Who knows? Pretty soon she could be the boss of the whole entire lunch operation! USA Today: “Junie B. is the darling of the young-reader set.” Publishers Weekly: “Park convinces beginning readers that Junie B.—and reading—are lots of fun.” Kirkus Reviews: “Junie’s swarms of young fans will continue to delight in her unique take on the world. . . . A hilarious, first-rate read-aloud.” Time: “Junie B. Jones is a feisty six-year-old with an endearing penchant for honesty.”',
          id: '--qJuODQAAQBAJ--',
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones #19: Boss of Lunch',
        },
        {
          authors: ['Barbara Park'],
          description:
            '“Hilarious. Barbara Park makes reading fun.” —Dav Pilkey, author of Dog Man Barbara Park’s #1 New York Times bestselling chapter book series, Junie B. Jones, has been keeping kids laughing—and reading—for more than twenty-five years. Over 65 million copies sold! Meet the World’s Funniest First Grader—Junie B. Jones! One of Junie B.’s top front teeth is loose! Only Junie B. is not that thrilled about this development. Because what if she looks like toothless Uncle Lou? And even worse . . . what’s all this tooth fairy business? Like, who is this woman, really? And what does she do with all those used teeth? So many questions, so little time. USA Today: “Junie B. is the darling of the young-reader set.” Publishers Weekly: “Park convinces beginning readers that Junie B.—and reading—are lots of fun.” Kirkus Reviews: “Junie’s swarms of young fans will continue to delight in her unique take on the world. . . . A hilarious, first-rate read-aloud.” Time: “Junie B. Jones is a feisty six-year-old with an endearing penchant for honesty.”',
          id: '--ChOPDQAAQBAJ--',
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones #20: Toothless Wonder',
        },
        {
          authors: ['Barbara Park'],
          description:
            '“Hilarious. Barbara Park makes reading fun.” —Dav Pilkey, author of Dog Man Barbara Park’s #1 New York Times bestselling chapter book series, Junie B. Jones, has been keeping kids laughing—and reading—for more than twenty-five years. Over 65 million copies sold! Meet the World’s Funniest Kindergartner—Junie B. Jones! It’s almost the end of the school year, and Room Nine is taking a field trip to a farm! There’s lots of fun farm stuff there. Like a real actual barn. And a real actual farmer. There’s even real alive animals you can pet! Only, where’s the gift shop? That’s what Junie B. Jones would like to know. Surely no one would want Junie B. to go home empty-handed. . . . USA Today: “Junie B. is the darling of the young-reader set.” Publishers Weekly: “Park convinces beginning readers that Junie B.—and reading—are lots of fun.” Kirkus Reviews: “Junie’s swarms of young fans will continue to delight in her unique take on the world. . . . A hilarious, first-rate read-aloud.” Time: “Junie B. Jones is a feisty six-year-old with an endearing penchant for honesty.”',
          id: '--7s1UjYjGuAoC--',
          price: 5.99,
          publisher: 'Random House Books for Young Readers',
          title: 'Junie B. Jones #15: Junie B. Jones Has a Peep in Her Pocket',
        },
      ],
    },
    id: 'call_pyW5b0Dnq3XoyQLkDHm7taeZ',
    type: 'functionResponse',
  },
  {
    name: '',
    content: {
      items: [
        {
          authors: ['Raina Telgemeier'],
          description:
            "From Raina Telgemeier, the #1 New York Times bestselling, multiple Eisner Award-winning author of Smile and Sisters! Callie loves theater. And while she would totally try out for her middle school's production of Moon over Mississippi, she can't really sing. Instead she's the set designer for the drama department's stage crew, and this year she's determined to create a set worthy of Broadway on a middle-school budget. But how can she, when she doesn't know much about carpentry, ticket sales are down, and the crew members are having trouble working together? Not to mention the onstage AND offstage drama that occurs once the actors are chosen. And when two cute brothers enter the picture, things get even crazier!",
          id: '--1w4fAwAAQBAJ--',
          price: 7.99,
          publisher: 'Scholastic Inc.',
          title: 'Drama: A Graphic Novel',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            "In a semi-autobiographical graphic novel, Raina's disappointing bond with a cranky, independent younger sister is further challenged by the arrival of a baby brother and an estrangement in their parents' marriage.",
          id: '--MZlDmwEACAAJ--',
          publisher: 'Graphix',
          title: 'Sisters',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            "A box set of Raina Telgemeier's bestselling, award-winning graphic novels about family, friendship, and the highs and lows of growing up! Smile The true story of how Raina severely injured her two front teeth when she was in the sixth grade, and the dental drama that followed! Drama Callie is the set designer for her middle school's spring musical, and is determined to create a set worthy of Broadway. Both onstage AND offstage drama ensues! Sisters Raina can't wait to be a big sister. Amara is cute, but she's also cranky and mostly prefers to play by herself. Their relationship doesn't improve much over the years... can they figure out how to get along? Ghosts Catrina and her family move to a new town because her sister, Maya, is sick. When they learn there are ghosts there, Maya wants to meet one, and Cat must put aside her fears for Maya's sake -- and her own. Guts Raina has tummy trouble, and it seems to coincide with her worries about food, school, family, and changing friendships. A thoughtful, charming, and funny true story about growing up and gathering the courage to face -- and eventually conquer -- fear.",
          id: '--fKj3zQEACAAJ--',
          publisher: 'Graphix',
          title: 'Raina Telgemeier Collection Box Set',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            "From Raina Telgemeier, the #1 New York Times bestselling, multiple Eisner Award-winning author of Smile, Drama, and Sisters! Catrina and her family are moving to the coast of Northern California because her little sister, Maya, is sick. Cat isn't happy about leaving her friends for Bahía de la Luna, but Maya has cystic fibrosis and will benefit from the cool, salty air that blows in from the sea. As the girls explore their new home, a neighbor lets them in on a secret: There are ghosts in Bahía de la Luna. Maya is determined to meet one, but Cat wants nothing to do with them. As the time of year when ghosts reunite with their loved ones approaches, Cat must figure out how to put aside her fears for her sister's sake - and her own.Raina Telgemeier has masterfully created a moving and insightful story about the power of family and friendship, and how it gives us the courage to do what we never thought possible.",
          id: '--Qg5YCwAAQBAJ--',
          price: 7.99,
          publisher: 'Scholastic Inc.',
          title: 'Ghosts: A Graphic Novel',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            "The Spanish edition of Raina Telgemeier's #1 New York Times bestselling graphic novel! ¡Una novela gráfica en español! Callie podría presentarse a la audición del musical \"La luna sobre Misisipí\" pero no canta bien. Por eso ha elegido encargarse de la escenografía, pero para hacerla tendrá que trabajar muy duro. Desafortunadamente, tan pronto se asignan los papeles de la obra, ¡comienza el drama dentro Y fuera del escenario!A middle-school graphic novel in Spanish! Callie loves theater. And while she would totally try out for her middle school's production of Moon over Mississippi, she can't really sing. Instead she's the set designer for the drama department's stage crew, and this year she's determined to create a set worthy of Broadway on a middle-school budget. But how can she, when she doesn't know much about carpentry, ticket sales are down, and the crew members are having trouble working together? Not to mention the onstage AND offstage drama that occurs once the actors are chosen. And when two cute brothers enter the picture, things get even crazier!",
          id: '--ynA1DwAAQBAJ--',
          price: 7.99,
          publisher: 'Scholastic Inc.',
          title: 'Drama (Spanish Edition)',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            'Raina just wants to be a normal sixth-grader. But one night after Girl Scouts she trips and falls, severely injuring her two front teeth. What follows is a long and frustrating journey with on-again, off-again braces, surgery, embarassing headgear and even a retainer with fake teeth attached(!). And on top of that theres still more to deal with: a major earthquake, boy confusion and friends who turn out not so friendly. Rainas story takes us from middle school to high school, where she discovers her artistic voice, finds out what true friendship really means and where she can finally... smile.',
          id: '--zL2SzQEACAAJ--',
          title: "Smile Collector's Edition",
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            'In a semi-autobiographical graphic novel, the author describes her childhood anxiety, in a story about growing up and gathering the courage to face and conquer her fears.',
          id: '--fimivAEACAAJ--',
          publisher: 'Graphix logo',
          title: 'Guts',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            'Offers writing prompts, activities, and tips and techniques for writing and illustrating a story.',
          id: '--c-s9uAEACAAJ--',
          publisher: 'Graphix',
          title: 'Share Your Smile',
        },
        {
          authors: ['Raina Telgemeier'],
          description:
            "Two semi-autobiographical graphic novels recount Riana's struggles with corrective dental techniques and her disappointing bond with her cranky younger sister following the arrival of a baby brother.",
          id: '--lrkQngEACAAJ--',
          publisher: 'Scholastic Incorporated',
          title: 'Smile and Sisters: The Box Set',
        },
        {
          authors: ['Ann M. Martin'],
          description:
            'Stacey, a member of the Baby-sitters Club, struggles with her parents who refuse to accept that she has diabetes, baby-sitting problems, and a rival baby-sitting club.',
          id: '--ekPPngEACAAJ--',
          title: 'The Truth about Stacey',
        },
      ],
    },
    id: 'call_aVVeEzE7NvdJltemRl4f65xW',
    type: 'functionResponse',
  },
  {
    content:
      "Here are some fantastic middle-grade book recommendations from Jeff Kinney, James Patterson, Barbara Park, and Raina Telgemeier:\n\n### 1. Jeff Kinney\n1. **--8MXK_KrHOZYC--**: *Diary of a Wimpy Kid (Diary of a Wimpy Kid #1)* - Join Greg Heffley as he navigates the challenges of middle school through funny drawings and relatable diary entries.\n2. **--BTM7iwk64VgC--**: *The Ugly Truth (Diary of a Wimpy Kid #5)* - Greg faces the pressures of growing up while trying to maintain his friendship with Rowley.\n3. **--HKmkHMhcfNEC--**: *Cabin Fever (Diary of a Wimpy Kid #6)* - Trapped indoors with his family during a blizzard, Greg faces the threat of school punishment for something he didn’t do.\n4. **--GyNKzQEACAAJ--**: *The Deep End (Diary of a Wimpy Kid Book 15)* - Follow the Heffleys on a not-so-perfect family camping trip filled with unexpected twists.\n5. **--KztRnvGJs9oC--**: *Diary of a Wimpy Kid* - The original book that started it all, capturing the hilarity and hardships of a middle schooler.\n\n### 2. James Patterson\n1. **---IKLDwAAQBAJ--**: *Ali Cross* - Following in the footsteps of his famous detective father, Ali must uncover the mystery of his missing best friend.\n2. **--oEiHEAAAQBAJ--**: *Minerva Keen's Detective Club* - Join Minerva as she starts her detective club to solve the mysteries looming in her luxurious apartment building.\n3. **--24oFBAAAQBAJ--**: *James Patterson's Bestselling Kids' Series -- Chapter Sampler* - A sampler of excerpts from James Patterson's various middle-grade series, offering a taste of his humor and excitement.\n4. **--P7oCEAAAQBAJ--**: *Ali Cross: Like Father, Like Son* - Ali's detective skills are put to the test as he witnesses a crime near his school.\n5. **--LlpHEAAAQBAJ--**: *Ali Cross: The Secret Detective* - Eager to follow in his father’s legacy, Ali faces tough challenges as he tries to solve crimes on his own.\n\n### 3. Barbara Park\n1. **--tzdCDUgReIkC--**: *My Mother Got Married and Other Disasters* - The humorous tale of Charlie Hickle dealing with his parents' divorce and all the chaos that follows.\n2. **--MR6PQh1yjvIC--**: *Don't Make Me Smile* - Charlie launches a campaign against his parents after their divorce, determined to make his feelings known.\n3. **--6ZiODQAAQBAJ--**: *Junie B. Jones #18: First Grader (at last!)* - Join Junie B. as she navigates the ups and downs of starting first grade.\n4. **--WgNlrNinOk4C--**: *Junie B. Jones and the Stupid Smelly Bus* - Junie B. embarks on her kindergarten adventure, mandatory bus rides included!\n5. **--ChOPDQAAQBAJ--**: *Junie B. Jones #20: Toothless Wonder* - Junie B. is concerned about her loose tooth and what it may mean for her appearance.\n\n### 4. Raina Telgemeier\n1. **--1w4fAwAAQBAJ--**: *Drama: A Graphic Novel* - Callie navigates the ups and downs of middle school theater, creating a set while dealing with drama on and off stage.\n2. **--MZlDmwEACAAJ--**: *Sisters* - A semi-autobiographical tale about growing up with a cranky little sister and the challenges that come along.\n3. **--Qg5YCwAAQBAJ--**: *Ghosts: A Graphic Novel* - Catrina and her sister Maya discover the ghosts in their new town, teaching them about family and fear.\n4. **--zL2SzQEACAAJ--**: *Smile Collector's Edition* - Raina's journey from being a kid with braces to finding her confidence, filled with humorous and relatable moments.\n5. **--fimivAEACAAJ--**: *Guts* - A graphic novel that explores growing up and overcoming anxiety through a heartfelt and humorous lens.\n\n### Summary\nThese selections cater perfectly to middle-grade readers, offering humor, relatable life situations, and engaging illustrations. From the hilarious misadventures of Greg Heffley to the fun antics of Junie B. Jones, your daughter is bound to find something she'll enjoy. Raina Telgemeier’s graphic novels also provide a thoughtful look at family dynamics and adolescence, making them both entertaining and insightful.\n\nIf you need further assistance or recommendations in a different genre, let me know! Happy reading!",
    type: 'assistant',
  },
]
