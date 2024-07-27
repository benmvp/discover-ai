import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  {
    content:
      "Ready to discover your next favorite read? Whether you're looking for your next page-turner, a thoughtful gift, or the perfect book for your little one, I'm your dedicated book guide. Tell me a little bit about who the book is for and what you're looking for, or any other preferences you have. Let's embark on a literary adventure together!",
    type: 'assistant',
  },
  { content: 'have you heard of the Princess in Black books?', type: 'user' },
  {
    content:
      'Absolutely! The "Princess in Black" series by Shannon Hale and Dean Hale is a delightful blend of adventure, humor, and strong female characters. It follows Princess Magnolia, who leads a double life as the superhero, the Princess in Black, fighting against monsters while maintaining her royal facade.\n\nAre you looking for books in the same vein, perhaps for children? If so, please share the age of the child and any specific themes or genres you think they\'ll enjoy!',
    type: 'assistant',
  },
  {
    content:
      "yeah similar style books but for my older daughter, Simone. she's going to 6th grade",
    type: 'user',
  },
  {
    content:
      'Great! For a 6th grader like Simone, we can look for books that are fun, adventurous, feature strong characters, and have a touch of humor or fantasy, much like "The Princess in Black." \n\nHere are a few questions to narrow it down:\n- Does she have any favorite authors or series she loves?\n- Is she more into fantasy, adventure, or other genres?\n- Would you like to include themes like friendship, adventure, or more superhero-like stories? \n\nLet me know so I can find the perfect books for her!',
    type: 'assistant',
  },
  { content: "she doesn't really like fantasy", type: 'user' },
  {
    content:
      "Got it! Since Simone isn't into fantasy, we can focus on adventure, contemporary stories, or even thrilling mysteries that have strong characters and engaging plots. \n\nHow about any themes like friendship, self-discovery, or problem-solving? And does she prefer light-hearted stories, or is she open to ones with more serious themes? Let's find the best fit for her!",
    type: 'assistant',
  },
  { content: 'those all sound good actually', type: 'user' },
  {
    calls: [
      {
        id: 'call_90tOVgLYMrlFYgN023trKJah',
        name: 'searchBooks',
        arguments: {
          genre: 'Juvenile Fiction',
          term: 'adventure self-discovery friendship mystery',
          printType: 'books',
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
          authors: ['Lora Rick'],
          description:
            'Title: "The Adventure of a Lifetime: A Magical Quest for Courage and Friendship" Genre: Children\'s Fiction/Adventure/Fantasy Book Description: Join 10-year-old Sophie on an extraordinary adventure that will test her courage and forge lasting friendships in this heartwarming tale of self-discovery. Sophie is a y oung girl with a wild imagination and a longing for adventure. One day, while exploring her grandmother\'s attic, she discovers a mysterious old book that transports her to a magical world called Dreamlandia. There, Sophie embarks on a quest to save the land from an evil sorceress who has plunged it into darkness. With the help of new friends she meets along the way - a mischievous fairy named Sparkle, a brave knight named Sir Oliver, and a timid gnome named Gus - Sophie must navigate through enchanted forests, treacherous mountains, and mysterious caves to retrieve the lost gems of courage and restore light to Dreamlandia. As Sophie faces challenges and overcomes obstacles, she learns valuable lessons about bravery, friendship, and the power of believing in oneself. Along the journey, she discovers her own inner strength and courage, and forms bonds that will last a lifetime. "The Adventure of a Lifetime" is a heartwarming and magical tale that will captivate young readers with its enchanting world and timeless themes of courage, friendship, and self-discovery. Perfect for children aged 8-12 who love fantasy and adventure stories, this book will inspire readers to embark on their own journey of self-discovery and embrace the magic of imagination. Get ready for an unforgettable adventure with Sophie and her friends in Dreamlandia!',
          id: '--qPjYzwEACAAJ--',
          publisher: 'Independently Published',
          title: 'The Adventure of a Lifetime',
        },
        {
          authors: ['A. Chapman'],
          description:
            'This was no ordinary summer camp and these are no ordinary scouts. What started as a routine scouting adventure turns into an epic journey of self-discovery and friendship in the Canadian wilderness. Six scouts take on a new adventure and find themselves lost and alone, stranded on a mountainside while one of their patrol looks for help. Battling through bad weather and difficult terrain the scouts discover a WWII aircraft hiding the secret that has been lost for over 80 years and starting an adventure that would change their lives forever. One scout sets out to find help, leaving his friends as he sets out deep into the mountainside, using all his scouting skills as he desperately tries to escape the mountain, raise the alarm and rescue his friends. A great read for young adult readers, written as a traditional adventure story in a modern age. 196 Pages, Paperback, 5" x 8" with glossy cover. Ages 9 - 16.',
          id: '--vki7zgEACAAJ--',
          publisher: 'Independently Published',
          title: 'Missing on Mystery Mountain',
        },
        {
          authors: ['Samuel Robinson'],
          description:
            'Step into a world where secrets hide beneath the surface, where everyday lives blend with extraordinary events, and where the power of friendship unlocks incredible possibilities. Welcome to "The Mystery of Whispering Hollow," an enchanting story that will take you on an unforgettable journey filled with puzzles, adventure, and self-discovery. Have you ever wondered what lies beyond the ordinary? What if there\'s more to our world than what meets the eye? In the peaceful town of Whispering Hollow, a young boy named Tim discovers a remarkable secret that will change his life forever. As he unravels the mystery hidden in his own backyard, he embarks on an exciting adventure that defies logic, leading him to an unlikely friendship with a magical being. But as Tim and his new friend, Zog, navigate a world of wonder and danger, they soon realize that their bond will face unexpected challenges. Can Tim keep Zog\'s existence a secret? Will their friendship endure the tests that lie ahead? And what secrets does Whispering Hollow hold, waiting to be revealed? "The Mystery of Whispering Hollow" is a heartwarming and thrilling story that will captivate readers of all ages. Join Tim and Zog as they discover the true meaning of friendship, embrace the unknown, and learn that sometimes the greatest adventures are found in the most surprising places. Are you ready to explore a world where imagination knows no limits? Will you dare to unlock the secrets of Whispering Hollow and embark on an adventure that will leave you spellbound? Get ready to immerse yourself in a captivating tale that will ignite your curiosity and remind you of the magic that resides within each of us. "The Mystery of Whispering Hollow" beckons you to open its pages and uncover the extraordinary hidden within the ordinary. Are you prepared to embark on an unforgettable journey?',
          id: '--K1-Q0AEACAAJ--',
          publisher: 'Independently Published',
          title: 'The Mystery of Whispering Hollow',
        },
        {
          authors: ['Kartik Shanker'],
          description:
            '‘This could be some new kind of animal. Something new to our forest. Wouldn’t that be exciting?’ When Lori, a curious and wide-eyed slender loris, spies a bewildering cat-like figure in the fading light of the evening, she instantly becomes obsessed with finding out what it is. So she teams up with her friend Don Wrongo, the crafty racket-tailed drongo, to look for the elusive animal. But they can hardly get to the bottom of this all by themselves. And along their tireless search for the ever-teasing shadow, they recruit the wiles of M. Owli, the non-musical delights of a mob of mynahs, the gossipy banter of Mina Mouse, the faithful love of Kau’a, the wisdom of Viji the all-knowing turtle, the fury of Baba Brown, the—the—Oh, for the love of gordonflies! Who’s not in this book? Packed with eccentric creatures and heart-stopping turns, Lori’s great big romp is a little look at friendship and self-discovery—and the rush of adventure.',
          id: '--f5RBDgAAQBAJ--',
          publisher: 'Random House India',
          title: "Lori's Magical Mystery",
        },
        {
          authors: ['Paul J Haas'],
          description:
            'Join Bolt, the endearing young robot boy, on a heartwarming journey of friendship, courage, and self-discovery in this enchanting children\'s picture book! Deep within a mysterious tower, Bolt feels trapped and alone, yearning for a taste of the world outside. But when a thrilling thunderstorm grants him the chance to escape, Bolt seizes the opportunity and embarks on a daring escapade into the unknown. Outside the tower, Bolt encounters Noah, a spirited young boy with a passion for adventure. Together, they forge an unbreakable bond that sets the stage for an unforgettable adventure of a lifetime! From racing bikes down steep hills to playing tag and savoring delightful ice cream, every moment is brimming with joy and laughter. But as the days unfold, challenges arise when Bolt\'s past comes back to haunt him. Will he find the courage to face his fears and protect his newfound friend? Filled with captivating illustrations that bring the story to life, "Wired for Friendship" is the perfect tale to captivate young hearts and inspire their imaginations. This heartwarming story teaches the value of friendship, bravery, and accepting oneself for who they truly are. Parents and children alike will cherish the delightful escapades of Bolt and Noah, making this book a cherished addition to bedtime stories and family reading time. Grab a copy of "Wired for Friendship" today and embark on an unforgettable journey that will warm your heart and remind us of all of the magic that comes from making friends and facing our fears together.',
          id: '--vKEW0AEACAAJ--',
          publisher: 'Independently Published',
          title: 'Wired For Friendship',
        },
        {
          authors: ['Daniel Muzey'],
          description:
            'Step through "The Secret Door to Imagination" and embark on a magical journey that will captivate the hearts and minds of children aged 6-8. Join Lily, a curious and imaginative girl, as she discovers a hidden door within an ancient tree that transports her to a breathtaking realm filled with talking animals, enchanted forests, and boundless wonders. Guided by her loyal companion Nutmeg, a playful squirrel, Lily navigates through captivating landscapes, encounters challenges, and unravels the mysteries of this fantastical world. Along the way, she learns valuable lessons about courage, friendship, and the limitless power of her own imagination. In this enchanting tale, young readers will be immersed in vibrant descriptions, vivid imagery, and a narrative that ignites their imagination. They will cheer for Lily as she solves riddles, faces fearsome adversaries, and embraces the magic that dwells within her. Through Lily\'s captivating journey, children will be inspired to tap into their own creativity, explore the wonders of their imagination, and discover the incredible possibilities that await them. "The Secret Door to Imagination" is a whimsical adventure that blends elements of fantasy, friendship, and self-discovery. Perfect for young readers aged 6-8, this delightful story is brought to life with vivid illustrations and relatable characters who teach important life lessons in a captivating and accessible way. This captivating tale will transport children to a world of endless possibilities, where imagination knows no bounds. Join Lily on her extraordinary adventure through "The Secret Door to Imagination," and ignite the magic within every young reader\'s heart.',
          id: '--GYYO0AEACAAJ--',
          publisher: 'Independently Published',
          title: 'The Secret Door to Imagination',
        },
        {
          authors: ['Wise Whimsy'],
          description:
            "Discover a world of wonder and self-discovery with Lulu the Ladybug in her captivating adventure, One Day with Lulu the Ladybug: The Lost Spots Mystery. Join Lulu as she sets off on a remarkable journey to find her lost spots, revealing a timeless lesson that will touch the hearts of children everywhere. In this enchanting tale, Lulu teaches us that true beauty lies within, reminding young readers of the incredible power of self-acceptance and embracing their own uniqueness. As Lulu uncovers the secrets of her lost spots, she encounters a vibrant cast of colorful characters who impart invaluable lessons about friendship, resilience, and the importance of staying true to yourself. Children will be captivated by Lulu's charming personality and unwavering determination. Through her delightful adventures and heartwarming encounters, Lulu becomes an inspiring role model, encouraging young minds to embrace their individuality and celebrate the qualities that make them special. Written with tender care and illustrated with breathtaking artistry, One Day with Lulu the Ladybug: The Lost Spots Mystery is a must-read for both children and parents alike. Dive into the pages of this captivating story and embark on a journey filled with laughter, love, and the boundless joy of self-discovery. This beautifully crafted children's book is a treasure trove of life lessons, encouraging children to embrace the beauty that lies within and reminding them that their unique qualities are what truly make them shine. With its timeless message of self-acceptance, One Day with Lulu the Ladybug: The Lost Spots Mystery will leave a lasting impression on young hearts and minds. Join Lulu on her breathtaking adventure and let her story ignite the spark of self-love and acceptance within the hearts of your little ones. Don't miss the chance to share this empowering tale with the special children in your life. Order your copy of One Day with Lulu the Ladybug: The Lost Spots Mystery and embark on a journey that will inspire, uplift, and celebrate the beautiful uniqueness that resides in us all.",
          id: '--MHNZ0AEACAAJ--',
          publisher: 'One Day With Your Favourite Animal Character Series 1',
          title: 'One Day with Lulu the Ladybug',
        },
        {
          authors: ['Marion Goreth'],
          description:
            'We are living in a world where true friendship can seem difficult to find and maintain. Most of the time, people lose important friends not because they want to, but due to ignorance of the secrets exposed in this book. When you are true best friends, your friendship is made stronger each time you share these secrets with each other. The"10 irrefutable Secrets to a great Friendship" unveils the roadmap to building and maintaining profound and lasting friendships that stand the test of time. "10 Irrefutable Secrets to a Great Friendship," is a children\'s book which introduces two little girls who embarked on a delightful journey of discovering the secrets of true friendship. Malaika was an immigrant who had just moved into Shapevalle town with her family. When school term opened, Malaika was all alone because she was new. Then, Charlotte came into the picture and befriended her, and each experience they encountered unveiled a secret of friendship adventure. Charlottes first adventure was showing kindness to Malaika, a newcomer who knew little about the school environment and town as well. Charlotte was set to perform her first friendship secret act of kindness to brighten the life of Malaika. She understood that even a simple gesture can have a positive impact on her friends\' happiness and well-being. As the story unfolds, the setting and plot bring the magical world of Shapevalle to life, captivating young readers\' imaginations and immersing them into real world experiences. The pursuit of their dreams and visit to different places depict the endearing moments shared by Charlotte and Malaika, further enhancing the readers\' connection to the story. As their journey reaches its climax, they encounter a challenging situation that tests their bond. After seeking some advice from loved ones, they discovered the power of forgiveness in healing wounds and how letting go of resentment can lead to a more profound and unbreakable friendship. Charlotte and Malaika realize that forgiveness allows them to let go of past hurt and move forward, strengthening their friendship with a renewed sense of trust and understanding. Drawing from the author\'s heartfelt insights, this book serves as a compassionate guide for cultivating and nurturing genuine bonds among children. The author aims to instill the values of these secrets in young readers\' minds for practical use. Although the book focuses on children, the essential tips presented in this book resonate with readers of all ages. Navigating through the chapters of "10 Irrefutable Secrets to a Great Friendship," you\'ll learn how to mend broken friendships, navigate conflicts, overcome obstacles, and discover the power of kindness, forgiveness, empathy, and other secrets. As you embark on discovering the secrets, you\'ll also have moments of discovery and self-reflection that will deepen your understanding of others and explores the potential of genuine connections. Explore the beauty of reciprocity and shared values and embark on adventures that form the bedrock of extraordinary friendships. More importantly, gain valuable lessons from creating a support network that celebrates your successes, shares your sorrows, and encourages your growth. "10 Irrefutable Secrets to a Great Friendship." is a book that does not only entertain but also imparts meaningful life lessons to children. This captivating story will leave children inspired to cultivate meaningful connections with their friends, and also it will be a massive addition to their library making it a present and future reference. As you immerse yourself in the book "10 Irrefutable Secrets to a Great Friendship," Prepare to unveil the ultimate secrets to building and sustaining remarkable friendships that will last forever.',
          id: '--7Gol0AEACAAJ--',
          publisher: 'Independently Published',
          title: '10 Irrefutable Secrets to a Great Friendship',
        },
        {
          authors: ['StoryBuddiesPlay'],
          description:
            'The Bee Who Lost His Buzz: A Journey of Discovery and Friendship" invites readers into the enchanting world of Buzz, a cheerful bee who suddenly finds himself without his signature buzz. In this delightful children\'s story, Buzz sets off on a whimsical adventure through the vibrant meadow, seeking guidance from wise flowers and friendly creatures. Through heartwarming encounters and unexpected challenges, Buzz learns profound lessons about resilience, inner joy, and the enduring power of friendship. Vibrant illustrations and endearing characters bring this captivating tale to life, capturing the essence of childhood wonder and exploration. This captivating story encourages young readers to embrace challenges with courage, discover their unique strengths, and cherish the beauty of the natural world. Perfect for bedtime stories, classroom read-alouds , or independent reading, "The Bee Who Lost His Buzz" is a timeless tale that promotes positive values and leaves a lasting impression on young minds. Dive into this charming narrative and join Buzz on his transformative journey of self-discovery and friendship',
          id: '--7-38EAAAQBAJ--',
          price: 3,
          publisher: 'StoryBuddiesPlay',
          title: 'The Bee Who Lost His Buzz',
        },
        {
          authors: ['Daniel Muzey'],
          description:
            'an exhilarating adventure filled with mystery, courage, and the power of integrity in "The Mystery of the Missing Treasure." Mia and Ben, two curious siblings, stumble upon an ancient map that leads them to a hidden treasure rumored to be buried in the caves of Seashell Cove. With their hearts brimming with excitement, they embark on a secret treasure hunt, armed with determination and a pact to keep their quest to themselves. As they delve deeper into the dark and eerie caves, Mia and Ben encounter unexpected challenges and learn to rely on each other\'s trust and resilience. Guided by their unwavering bond, they overcome obstacles, face their fears, and discover that the true treasure lies not in riches but in the lessons they learn and the strength they gain along the way. With each step forward, they unravel cryptic clues, encounter mysterious symbols, and navigate treacherous paths. Their journey tests their integrity, as they must choose honesty over deception and truth over temptation. As they unlock the secrets hidden within the cave\'s depths, Mia and Ben realize that their adventure is not just about finding a physical treasure but about the personal growth and values they embrace. "The Mystery of the Missing Treasure" is a captivating children\'s story that weaves together suspense, friendship, and the power of integrity. It teaches young readers the importance of honesty, resilience, and the strength of familial bonds. Through Mia and Ben\'s thrilling journey, children will be inspired to face their own challenges with courage, make choices aligned with their values, and discover the treasure within themselves. Immerse young readers in a world of adventure and self-discovery with this enchanting tale. "The Mystery of the Missing Treasure" will ignite their imaginations, captivate their hearts, and leave them with valuable life lessons that will resonate long after they turn the final page.',
          id: '--lNkN0AEACAAJ--',
          publisher: 'Independently Published',
          title: 'The Mystery of the Missing Treasure',
        },
      ],
    },
    id: 'call_90tOVgLYMrlFYgN023trKJah',
    type: 'functionResponse',
  },
  {
    content:
      "Here are some fantastic book recommendations for Simone that focus on adventure, self-discovery, friendship, and a sprinkle of mystery—all perfect for a 6th grader:\n\n1. **--qPjYzwEACAAJ--**: _The Adventure of a Lifetime: A Magical Quest for Courage and Friendship_ by Lora Rick  \n   Sophie embarks on an extraordinary adventure in Dreamlandia where her courage and friendships are tested. A heartwarming tale of bravery and discovery!\n\n2. **--vki7zgEACAAJ--**: _Missing on Mystery Mountain_ by A. Chapman  \n   A group of scouts facing challenges in the Canadian wilderness leads to thrilling self-discovery and teamwork that resonates with young adventurers.\n\n3. **--K1-Q0AEACAAJ--**: _The Mystery of Whispering Hollow_ by Samuel Robinson  \n   Join Tim as he uncovers the secrets of his hometown with a magical twist, exploring friendship and adventure in an enchanting mystery.\n\n4. **--vKEW0AEACAAJ--**: _Wired For Friendship_ by Paul J Haas  \n   A charming picture book about Bolt the robot who discovers the joy of friendship and bravery through thrilling adventures outside his tower.\n\n5. **--lNkN0AEACAAJ--**: _The Mystery of the Missing Treasure_ by Daniel Muzey  \n   A thrilling treasure hunt filled with mystery, courage, and lessons in integrity as two siblings unravel secrets in the caves of Seashell Cove.\n\nThese books are not only engaging but also encourage values like friendship, resilience, and the power of facing challenges—perfect for Simone's age and preferences!\n\nIf she's open to exploring more genres, you might also consider books with themes of historical adventures or relatable contemporary stories. Let me know if you'd like more suggestions or if there's a specific area you want to dive into!",
    type: 'assistant',
  },
]
