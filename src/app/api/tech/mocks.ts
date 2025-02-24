import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  {
    content: "I'm looking to get a Chromebook for my daughter's 10th birthday",
    type: 'user',
  },
  {
    content:
      "That's so thoughtful! A Chromebook is a great choice for a 10-year-old.  Chromebooks are known for their simplicity and ease of use.  What kind of things will your daughter be using it for? Does she like to play games? Or maybe watch videos? \n\nAlso, what's your budget for this gift? \n",
    type: 'assistant',
  },
  {
    content:
      'I want her to use it primarily for school. I wanna stay under $300',
    type: 'user',
  },
  {
    type: 'functionCall',
    calls: [
      {
        name: 'searchProducts',
        arguments: { search: 'Chromebook', salePrice: 300 },
      },
    ],
    content:
      "Awesome! A Chromebook is perfect for schoolwork, and staying under $300 is a great target.  \n\nIs there anything specific you're looking for in terms of features? For example, is a touchscreen important? Or maybe a longer battery life? \n\nLet's see what we can find! \n\n",
  },
  {
    type: 'functionResponse',
    name: 'searchProducts',
    content: {
      items: [
        {
          id: '6574635',
          title:
            'HP - Chromebook 11A G6 11.6" Refurbished Laptop - AMD A-Series A4 with 4GB Memory - AMD Radeon R4 Graphics - 16GB SSD - Black',
          description:
            'Complete your projects on time with this refurbished HP 11A G6 Chromebook. The powerful 1.6GHz AMD A-Series A4 processor keeps up with most demanding programs, while 4GB of RAM supports smooth multitasking. This HP 11A G6 Chromebook has an 11.6" HD display for crisp visuals, and the 16GB SSD ensures fast load and boot times.',
          price: 119.99,
        },
        {
          id: '4392428',
          title: 'Case Logic - 12.1" Chromebooks/Ultrabooks Sleeve - Black',
          description:
            'Guard your Chromebook or Ultrabook from daily abuse with a sleeve designed for sleek protection. The padded lining cushions your investment while the zippered pocket stores your cords and accessories.',
          price: 24.99,
        },
        {
          id: '4817133',
          title:
            'Case Logic - 10-11.6" Chromebooks™/Ultrabooks™ Sleeve - Black',
          description:
            'A traditional sleeve complete with protective foam padding and sophisticated, stylish details.',
          price: 24.99,
        },
        {
          id: '5148402',
          title:
            'Targus - Vertical Slipcase for 12" Notebooks/Chromebooks - Black',
          description:
            'Ramp up your versatility&#8212;and your protection&#8212;with a case for 12&#8221; devices that can be used three ways. This cushioned neoprene slipcase has retracting, hideaway handles and a removable shoulder strap, so you can carry it as an over-the-shoulder bag or by the handles. To use it as a sleeve, just remove the shoulder strap and tuck in the handles to slip inside another bag. A front zippered pocket is ideal for holding a charger and small personal items, while an ID holder ensures easy identification. Ideal for work, school or anywhere around town, this sleeve offers the flexibility you want, and the protection you need.',
          price: 19.49,
        },
        {
          id: '9144182',
          title:
            'Targus - Intellect Slim Briefcase for 12.1" Notebooks/Chromebooks - Black',
          description:
            'For a simple case that covers all of the essentials, the Targus 12.1&#8221; Intellect Slim Briefcase provides plenty of organization for your everyday necessities. This briefcase gets back to the basics without compromising on function and has a large exterior pocket to store small accessories. The interior features a large padded laptop compartment with a file divider for all your documents. The exterior of the case is made of a durable nylon to protect your laptop while in transport. For your convenience and comfort, an adjustable and removable shoulder strap allows for hands-free carrying.',
          price: 28.99,
        },
        {
          id: '6411608',
          title:
            'Acer - Chromebook 311 C733 11.6" Chromebook - Intel Celeron - 4 GB Memory - 32 GB eMMC - Shale Black',
          description:
            'The Acer Chromebook 311 is the ideal laptop for all ages from the very young upwards. With its safety certification, state-of-the-art low-energy consuming processor, military standard specs and a long battery life, it can stand up to the daily rigors and intense usage of students inside or outside the classroom.',
          price: 284.99,
        },
        {
          id: '6495100',
          title:
            'HP - Chromebook 11 G9 EE 11.6" Chromebook - Intel Celeron - 4 GB Memory - 32 GB eMMC - Black',
          description:
            'HP Chromebooks. With the HP Chromebook runningn lightning-fast Chrome OS, the best of Google is at hand on a sleek and stylish notebook.',
          price: 239.99,
        },
        {
          id: '5969701',
          title:
            'Lenovo - Power Adapter for Tablet 10, ThinkPad 11, 11e Chromebook, Thinkpad 13, 13 Chromebook, ThinkPad A275, A285 and A475 - Black',
          description:
            'Top off the battery level of your ThinkPad notebook or tablet with this 45W Lenovo AC adapter. Its Smart Voltage system automatically delivers the right voltage depending on the device.',
          price: 50.99,
        },
        {
          id: '6527577',
          title:
            'Thule - Gauntlet Laptop Sleeve Laptop Case for 14” Apple MacBook Pro, 13” Apple MacBook Pro, Air, PCs, Laptops & Chromebooks - Black',
          description:
            'A sleek, molded laptop sleeve for 14 inch MacBook Pro, 13 inch MacBook Pro, 13 inch MacBook Air&#174; or laptops up to 12.31 x 8.71 inches. The rigid exterior and edge protection is designed to safeguard your device, while the clamshell design allows you to work directly out of the case.  Protect your device with this Gauntlet Laptop Sleeve/Case from Thule. Constructed out of polyurethane materials and sporting a clamshell design, the Gauntlet protects your device while in transit.  Enhanced corner and edge protection prevents damage caused by minor bumps and impacts, making this ideal for any daily commuter.  Adventurers who take their technology wherever they go will appreciate the clamshell in-case usability enabling you to work without removing your device from the case. Internal padding ensures maximum protection for your Laptop or Tablet.',
          price: 64.95,
        },
        {
          id: '6425802',
          title:
            'Thule - Gauntlet Laptop Sleeve Laptop Case for 16” Apple MacBook Pro, 15” Apple MacBook Pro, PCs Laptops & Chromebooks up to 14” - Blue',
          description:
            'Protect your device with this Gauntlet Laptop Sleeve/Case from Thule. Constructed out of polyurethane materials and sporting a clamshell design, the Gauntlet protects your device while in transit.  Enhanced corner and edge protection prevents damage caused by minor bumps and impacts, making this ideal for any daily commuter.  Adventurers who take their technology wherever they go will appreciate the clamshell in-case usability enabling you to work without removing your device from the case. Internal padding ensures maximum protection for your Laptop or Tablet.',
          price: 64.95,
        },
      ],
    },
  },
  {
    content: JSON.stringify({
      opening: "Okay, let's find the perfect Chromebook for your daughter!",
      recommendations: [
        {
          ids: ['6574635', '6411608', '6495100'],
          summary: 'Chromebooks under $300',
        },
      ],
      nexSteps:
        'Would you like to see some options with a touchscreen? Or maybe some other accessories like a protective case?',
      filter: JSON.stringify({ search: 'Chromebook', salePrice: 300 }),
    }),
    type: 'assistant',
  },
]
