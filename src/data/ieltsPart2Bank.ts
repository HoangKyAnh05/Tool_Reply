export interface IeltsPart2Item {
  id: number;
  category: string;
  topic: string;
  question: string;
  cueCardPrompt: string;
  vocab: string;
  answer: string;
}

export const ieltsPart2Bank: IeltsPart2Item[] = [
  // 1. People & Personalities
  {
    id: 1,
    category: "People & Personalities",
    topic: "Describe a person you admire a lot",
    question: "Describe a person you admire a lot.",
    cueCardPrompt: "You should say:\n- Who this person is\n- How you know them\n- What they do\n- And explain why you admire them so much.",
    vocab: "role model - hình mẫu lý tưởng\nunwavering resilience - sự kiên cường bền bỉ\ninspire positive change - truyền cảm hứng thay đổi tích cực\nselfless dedication - sự cống hiến quên mình",
    answer: `🌟 Today I would love to talk about my beloved grandmother, who has always been my greatest role model and source of inspiration.
👵 She grew up in a humble rural village during an era of significant socio-economic turmoil.
💪 Despite overcoming tremendous hardships in her early years, she faced every adversity with unwavering resilience and grace.
📚 Although she never had the privilege of receiving higher formal education, her wisdom and emotional intelligence are boundless.
🌾 She spent decades working tirelessly in agriculture while single-handedly nurturing our extended family.
🍲 What I admire most about her is her boundless generosity; she never hesitated to share meals with struggling neighbors.
🤝 Even in her advanced age today, she remains the emotional anchor who unites all generations under our roof.
💡 Whenever I confront setbacks in my academic pursuits or personal life, her patient words always offer profound clarity.
❤️ She taught me that true strength is quiet and that kindness is the most enduring legacy a person can leave behind.
🌸 Watching her live each day with contentment and gratitude has fundamentally shaped my own core values.
🎯 To put it simply, she embodies everything I aspire to become as a compassionate and resilient human being.`
  },
  {
    id: 2,
    category: "People & Personalities",
    topic: "Describe an energetic person you know",
    question: "Describe an energetic person you know.",
    cueCardPrompt: "You should say:\n- Who this person is\n- How you know them\n- What makes them energetic\n- And explain how you feel about them.",
    vocab: "boundless energy - nguồn năng lượng vô tận\ninfectious enthusiasm - sự nhiệt huyết dễ lan tỏa\nmultitask effortlessly - làm nhiều việc cùng lúc dễ dàng",
    answer: `⚡ Today I would love to share a story about my university close friend, Minh, who is widely renowned for his boundless energy.
🏃 We first crossed paths during our freshman orientation week at university nearly four years ago.
🤝 From our very first interaction, his vibrant aura, radiant smile, and cheerful demeanor immediately caught my attention.
🌅 What makes Minh exceptionally energetic is his disciplined daily routine and relentless positive drive.
👟 He consistently wakes up at 5:00 AM every single morning to go for a brisk 10-kilometer jog around the lake.
📚 After that, he heads straight to the campus library to review seminar materials before official morning lectures begin.
💼 Besides maintaining top academic standing in our computer science cohort, he also actively presides over the student leadership council.
🚀 He possesses an extraordinary capacity to multitask effortlessly between demanding software projects and charity campaigns.
😊 I vividly recall during our grueling finals week last semester when everyone was feeling utterly drained and exhausted.
🔥 Minh stepped forward and organized lively group study sessions, bringing healthy snacks and cheering everyone on.
🎉 His infectious enthusiasm and optimism effortlessly lifted the collective spirits of our entire study group.
💡 Whenever I find myself procrastinating or feeling low on motivation, observing his passionate work ethic instantly inspires me.
🎯 He genuinely proves that high energy is not just a genetic gift, but a conscious lifestyle choice driven by purpose.
🌟 All in all, having such an energetic companion has profoundly elevated my own personal standards and daily productivity.`
  },
  {
    id: 3,
    category: "People & Personalities",
    topic: "Describe an intelligent person you know",
    question: "Describe an intelligent person you know.",
    cueCardPrompt: "You should say:\n- Who this person is\n- What their profession is\n- Why you think they are intelligent\n- And explain how they influenced you.",
    vocab: "sharp analytical mind - tư duy phân tích nhạy bén\nbreak down complex concepts - chia nhỏ khái niệm phức tạp\ninvaluable mentor - người cố vấn vô giá",
    answer: "🧠 I would like to describe → 👨‍🏫 my high school physics teacher. → 💡 He possesses a remarkably sharp analytical mind → 🔬 capable of breaking down complex formulas → 🎨 into intuitive real-life demonstrations. → 🤝 Whenever students faced difficult puzzles, → ✨ he guided us patiently, → 🎓 inspiring my passion for logical problem-solving."
  },
  {
    id: 4,
    category: "People & Personalities",
    topic: "Describe a creative person whose work you appreciate",
    question: "Describe a creative person whose work you appreciate.",
    cueCardPrompt: "You should say:\n- Who this person is\n- What they create\n- Where you saw their work\n- And explain why you consider them creative.",
    vocab: "aesthetic vision - tầm nhìn thẩm mỹ\nblend tradition and modernity - hòa quyện truyền thống và hiện đại\ninnovative craftsmanship - tay nghề sáng tạo",
    answer: "🎨 I would like to introduce → 👩‍🎨 a local ceramic artisan in Bat Trang village. → 🏺 She blends traditional Vietnamese pottery → 🌟 with sleek minimalist modern designs. → 🖼️ I first encountered her masterpieces at an art gallery, → ✨ and was captivated by the subtle glazes → 🌿 and organic textures that breathe life into raw clay."
  },
  {
    id: 5,
    category: "People & Personalities",
    topic: "Describe a famous person you would like to meet",
    question: "Describe a famous person you would like to meet.",
    cueCardPrompt: "You should say:\n- Who this person is\n- What they are famous for\n- What you would talk about\n- And explain why you want to meet them.",
    vocab: "visionary entrepreneur - doanh nhân có tầm nhìn\nrevolutionize industries - cách mạng hóa các ngành công nghiệp\nsustainable future - tương lai bền vững",
    answer: "🚀 If given the opportunity, → 💡 I would love to meet Elon Musk, → 🚗 the visionary leader behind Tesla and SpaceX. → 🌍 I admire his audacity to revolutionize sustainable transport → 🌌 and push human boundaries toward multi-planetary life. → 💬 I would ask him about maintaining mental focus → ⚡ while managing colossal global technological projects."
  },

  // 2. Places & Cities
  {
    id: 6,
    category: "Places & Cities",
    topic: "Describe a city you have visited that impressed you",
    question: "Describe a city you have visited that impressed you.",
    cueCardPrompt: "You should say:\n- Where this city is\n- When you went there\n- What you did there\n- And explain why it made a lasting impression.",
    vocab: "futuristic architecture - kiến trúc mang tính tương lai\neffortless urban transit - giao thông đô thị thuận tiện\ncultural melting pot - nơi giao thoa nhiều nền văn hóa",
    answer: "🏙️ One city that truly mesmerized me → 🇸🇬 is Singapore, which I visited last summer. → 🚇 The urban efficiency and spotless streets → 🌿 combined with lush vertical gardens → 🌺 created an eco-futuristic haven. → 🚶 Exploring Marina Bay and Gardens by the Bay → 🌃 left an indelible impression of how sustainable cities can thrive."
  },
  {
    id: 7,
    category: "Places & Cities",
    topic: "Describe a quiet place you like to spend time in",
    question: "Describe a quiet place you like to spend time in.",
    cueCardPrompt: "You should say:\n- Where it is\n- How often you go there\n- What you do there\n- And explain why you find it peaceful.",
    vocab: "peaceful sanctuary - chốn bình yên thanh tịnh\nsheltered from bustling traffic - cách ly khỏi khói bụi ồn ào\nrejuvenate mental clarity - hồi phục sự minh mẫn",
    answer: "🌳 My favorite peaceful sanctuary → 📚 is a quiet corner in the city library → 🌿 surrounded by tall oak bookshelves and gentle sunlight. → 🛋️ I go there every Sunday afternoon → 📖 to read books and take notes in absolute tranquility. → 😌 It shields me from bustling urban noise → 🧘 and rejuvenates my mental clarity."
  },
  {
    id: 8,
    category: "Places & Cities",
    topic: "Describe a historical town you visited",
    question: "Describe a historical town you visited.",
    cueCardPrompt: "You should say:\n- Where this town is\n- What it looks like\n- What historical aspects you learned\n- And explain how you felt being there.",
    vocab: "ancient heritage - di sản cổ kính\nyellow-hued architecture - kiến trúc tường vàng đặc trưng\nlantern-lit alleys - ngõ phố rực rỡ đèn lồng",
    answer: "🏮 I will talk about Hoi An ancient town, → 🌊 located along the Thu Bon River. → 🏛️ Its iconic yellow-hued merchant houses → 🏮 and vibrant lantern-lit canals → 📜 reflect centuries of international maritime trading. → 🚶 Strolling through the cobblestone streets at dusk → ✨ felt like stepping back in time into a poetic fairy tale."
  },
  {
    id: 9,
    category: "Places & Cities",
    topic: "Describe a public park or garden you enjoy visiting",
    question: "Describe a public park or garden you enjoy visiting.",
    cueCardPrompt: "You should say:\n- Where it is located\n- What facilities it has\n- Who you usually go there with\n- And explain why you enjoy it.",
    vocab: "green lung of the city - lá phổi xanh của thành phố\nscenic lakeside promenade - lối dạo ven hồ thơ mộng\noutdoor workout zones - khu tập thể thao ngoài trời",
    answer: "🌿 I love visiting West Lake Park, → 🌾 the expansive green lung of Hanoi. → 🚴 It features paved jogging tracks, → 🌸 lotus ponds, and open workout stations. → 🌅 I frequently jog there at sunrise with friends → ☀️ to inhale the crisp morning breeze → 🏃 and kickstart the day with positive physical vitality."
  },
  {
    id: 10,
    category: "Places & Cities",
    topic: "Describe an ideal house or apartment you would like to live in",
    question: "Describe an ideal house or apartment you would like to live in.",
    cueCardPrompt: "You should say:\n- Where it would be\n- What it would look like\n- What special features it would have\n- And explain why you would love to live there.",
    vocab: "minimalist interior - nội thất tối giản\nfloor-to-ceiling windows - cửa sổ kính kịch trần\nsmart home automation - tự động hóa nhà thông minh",
    answer: "🏠 My dream residence is a sunlit penthouse → 🌆 overlooking a serene riverfront. → ☀️ It would feature floor-to-ceiling glass windows, → 🛋️ natural timber flooring, and minimalist Scandinavian furniture. → 🤖 Equipped with smart energy-saving automation, → 🌿 it would offer a peaceful, aesthetic sanctuary → 😌 to foster productivity and peaceful family moments."
  },

  // 3. Historical Places & Heritage
  {
    id: 11,
    category: "Historical Places & Heritage",
    topic: "Describe a historical building you visited",
    question: "Describe a historical building you visited.",
    cueCardPrompt: "You should say:\n- Where it is\n- What it was used for\n- What it looks like\n- And explain why it is important.",
    vocab: "architectural heritage - di sản kiến trúc\nsymbol of academic excellence - biểu tượng tinh hoa học thuật\nstone turtle steles - bia rùa đá cổ kính",
    answer: "🏛️ I want to describe the Temple of Literature in Hanoi, → 🎓 Vietnam's very first national university. → 📜 Founded in the 11th century, it houses ancient courtyards, → 🐢 stone turtle steles honoring brilliant scholars, → 🏯 and traditional wooden pavilions. → 💡 It stands as a timeless symbol of reverence for education → 🌟 and academic excellence."
  },
  {
    id: 12,
    category: "Historical Places & Heritage",
    topic: "Describe a museum that taught you something new",
    question: "Describe a museum that taught you something new.",
    cueCardPrompt: "You should say:\n- Where the museum is\n- What exhibits it displays\n- What you learned there\n- And explain why you found it educational.",
    vocab: "interactive exhibits - phòng trưng bày tương tác\nethnological diversity - sự đa dạng nhân chủng học\nindigenous traditions - phong tục bản địa",
    answer: "🏺 The Vietnam Museum of Ethnology in Hanoi → 👥 showcases the rich cultural tapestry of 54 ethnic groups. → 🏡 It features authentic life-sized tribal houses, → 🧵 traditional handwoven textiles, and festive artifacts. → 💡 Visiting it opened my eyes to indigenous customs → 🌿 and the profound harmony between ethnic tribes and nature."
  },
  {
    id: 13,
    category: "Historical Places & Heritage",
    topic: "Describe an ancient monument that fascinated you",
    question: "Describe an ancient monument that fascinated you.",
    cueCardPrompt: "You should say:\n- What monument it is\n- Where it is situated\n- What historical background it has\n- And explain why it fascinated you.",
    vocab: "architectural wonder - kỳ quan kiến trúc\nmagnificent stone carvings - phù điêu đá lộng lẫy\nmystical atmosphere - không khí huyền bí",
    answer: "🛕 I was deeply enchanted by Angkor Wat in Cambodia, → 🌴 the largest religious monument in the world. → 🗿 Its towering lotus-shaped towers and intricate sandstone bas-reliefs → 📜 showcase the peak of Khmer classical art. → 🌅 Watching the sunrise illuminate its sacred reflection pool → 🤩 was an awe-inspiring spiritual experience."
  },
  {
    id: 14,
    category: "Historical Places & Heritage",
    topic: "Describe a traditional festival celebrated in your country",
    question: "Describe a traditional festival celebrated in your country.",
    cueCardPrompt: "You should say:\n- What festival it is\n- When it takes place\n- What activities people do\n- And explain why this festival is meaningful.",
    vocab: "lunar new year - tết nguyên đán\nfamily reunion - sum họp gia đình\nancestral veneration - tưởng nhớ tổ tiên",
    answer: "🧧 The most important cultural celebration is Tet, → 🌸 the Vietnamese Lunar New Year occurring in early spring. → 🧹 Families clean and adorn houses with peach blossoms, → 🍲 wrap savory traditional square sticky rice cakes (Banh Chung), → 👨‍👩‍👧‍👦 and exchange heartfelt wishes for prosperity. → ❤️ It is a sacred time for family reunions and honoring ancestral roots."
  },
  {
    id: 15,
    category: "Historical Places & Heritage",
    topic: "Describe an interesting tradition in your culture",
    question: "Describe an interesting tradition in your culture.",
    cueCardPrompt: "You should say:\n- What the tradition is\n- Who practices it\n- When it happens\n- And explain how you feel about it.",
    vocab: "culinary art - nghệ thuật ẩm thực\nherbal infusion - nước trà thảo mộc\nslow mindful living - lối sống chậm tĩnh tâm",
    answer: "🍵 I want to highlight the art of Vietnamese tea drinking. → 🌿 Elders and tea connoisseurs brew ancient green tea → 🌸 infused with fresh lotus blossoms. → 🧘 It is enjoyed slowly in small ceramic cups, → 💬 sparking philosophical discussions and deep reflection. → 😌 This tradition reminds modern people to slow down and cherish simple mindful moments."
  },

  // 4. Memorable Trips & Travel
  {
    id: 16,
    category: "Memorable Trips & Travel",
    topic: "Describe an unforgettable journey you took",
    question: "Describe an unforgettable journey you took.",
    cueCardPrompt: "You should say:\n- Where you went\n- How you travelled\n- Who accompanied you\n- And explain why this journey was unforgettable.",
    vocab: "motorcycle expedition - chuyến đi xe máy khám phá\nwinding mountain passes - những khúc đèo uốn lượn\nbreathtaking panoramas - cảnh quan ngoạn mục",
    answer: "🏔️ Last autumn, I embarked on a motorbike trip → 🏍️ across the breathtaking Ha Giang Loop with close friends. → ⛰️ We navigated dramatic winding cliffside passes, → 🌾 gazed over golden terraced rice valleys, → 🌌 and stayed at rustic homestays. → 🤩 The raw grandeur of the mountains and warmth of local tribes made it the adventure of a lifetime."
  },
  {
    id: 17,
    category: "Memorable Trips & Travel",
    topic: "Describe a time you travelled by public transportation",
    question: "Describe a time you travelled by public transportation.",
    cueCardPrompt: "You should say:\n- What transport you used\n- Where you were going\n- What happened during the journey\n- And explain whether you enjoyed it.",
    vocab: "high-speed rail - tàu điện cao tốc\nsmooth commute - chuyến đi êm ái\npanoramic scenery - cảnh sắc bao quát",
    answer: "🚆 I recently rode the Cat Linh - Ha Dong elevated metro in Hanoi → 🏙️ for my daily commute to an IT conference. → ⏱️ The journey took merely 15 minutes, → 🚗 completely bypassing gridlocked rush-hour traffic jams. → 🪟 Gliding smoothly above the city while enjoying panoramic skyline views → ⚡ proved how modern transit enhances daily quality of life."
  },
  {
    id: 18,
    category: "Memorable Trips & Travel",
    topic: "Describe a scenic natural spot you visited",
    question: "Describe a scenic natural spot you visited.",
    cueCardPrompt: "You should say:\n- Where this place is\n- How you discovered it\n- What natural features it has\n- And explain why it is special.",
    vocab: "emerald waters - làn nước xanh ngọc bích\nlimestone karsts - dãy núi đá vôi kỳ vĩ\nserene seascape - khung cảnh biển tĩnh lặng",
    answer: "🌊 I want to describe Ha Long Bay, → 🚢 a world-renowned UNESCO natural wonder. → ⛰️ Thousands of majestic limestone karsts rise dramatically → 🛶 from tranquil emerald waters. → 🌅 Cruising through secluded caves and kayaking at sunset → 😌 immersed me in nature's sublime tranquility and artistry."
  },
  {
    id: 19,
    category: "Memorable Trips & Travel",
    topic: "Describe a road trip you would love to take in the future",
    question: "Describe a road trip you would love to take in the future.",
    cueCardPrompt: "You should say:\n- Where you would go\n- Who you would travel with\n- What vehicle you would drive\n- And explain why this road trip excites you.",
    vocab: "cross-country expedition - chuyến xuyên việt\ncoastal highway - đường cao tốc ven biển\ncamping under the stars - cắm trại dưới trời sao",
    answer: "🚗 I dream of embarking on a cross-country coastal road trip → 🗺️ along National Highway 1 from Hanoi to Ca Mau. → 🏖️ Driving a camper van with my best friends, → ⛺ we would camp beside secluded beaches, taste local seafood, → 🌅 and capture ocean sunrises every morning. → 🚀 It would symbolize the ultimate feeling of freedom and exploration."
  },
  {
    id: 20,
    category: "Memorable Trips & Travel",
    topic: "Describe a vacation that did not go as planned",
    question: "Describe a vacation that did not go as planned.",
    cueCardPrompt: "You should say:\n- Where you went\n- What went wrong\n- How you handled the situation\n- And explain what you learned from it.",
    vocab: "torrential downpour - mưa như trút nước\nadapt with optimism - thích nghi với sự lạc quan\nmemorable bonding - kỷ niệm gắn kết sâu sắc",
    answer: "🌧️ During a planned hiking trip to Sapa, → ⛈️ an unexpected torrential storm triggered dense fog and trail closures. → 🏨 Instead of scaling mountain peaks, → ☕ we gathered inside a cozy wooden café, brewed herbal tea, → 🎲 and played board games with fellow travelers. → 💡 It taught me that unexpected twists can become our fondest memories."
  },

  // 5. Technology & Gadgets
  {
    id: 21,
    category: "Technology & Gadgets",
    topic: "Describe an electronic device you use daily",
    question: "Describe an electronic device you use daily.",
    cueCardPrompt: "You should say:\n- What device it is\n- When and where you bought it\n- What you use it for\n- And explain why it is essential to you.",
    vocab: "indispensable tool - công cụ không thể thiếu\nseamless multitasking - đa nhiệm mượt mà\nstreamline workflow - tối ưu hóa quy trình làm việc",
    answer: "💻 My laptop is my most indispensable technological gadget. → 🛒 I purchased it two years ago for software programming and study. → ⚡ Its lightning-fast processor allows seamless coding, video editing, → 🌐 and digital collaboration with remote teammates. → 🎯 Without it, my professional workflow and creative output would come to a complete standstill."
  },
  {
    id: 22,
    category: "Technology & Gadgets",
    topic: "Describe a piece of technology that improved your life",
    question: "Describe a piece of technology that improved your life.",
    cueCardPrompt: "You should say:\n- What technology it is\n- How long you have used it\n- How it works\n- And explain how it improved your life.",
    vocab: "noise-cancelling technology - công nghệ chống ồn chủ động\nacoustic isolation - cách âm âm học\nlaser focus - sự tập trung cao độ",
    answer: "🎧 Active noise-cancelling wireless headphones → ⚡ transformed my daily productivity. → 🏢 In noisy shared offices or crowded cafes, → 🔇 with one switch they filter out background chatter and engine hums. → 🧠 This acoustic isolation allows me to enter a deep state of flow → 📈 and finish analytical tasks twice as fast."
  },
  {
    id: 23,
    category: "Technology & Gadgets",
    topic: "Describe a smart gadget in your house",
    question: "Describe a smart gadget in your house.",
    cueCardPrompt: "You should say:\n- What the gadget is\n- How you operate it\n- What features it has\n- And explain why it is helpful.",
    vocab: "robotic vacuum cleaner - máy hút bụi robot\nautomated scheduling - hẹn giờ tự động hóa\nfree up domestic chores - giải phóng việc nhà",
    answer: "🤖 An automated robotic vacuum cleaner is the most helpful device at home. → 📱 Programmed via a smartphone app, → 🗺️ it maps rooms using laser sensors and vacuums dust while I am at work. → 🏡 Returning to spotless floors every evening frees up hours of domestic chores, → 🛋️ allowing more time for relaxation and reading."
  },
  {
    id: 24,
    category: "Technology & Gadgets",
    topic: "Describe an invention you think changed the world",
    question: "Describe an invention you think changed the world.",
    cueCardPrompt: "You should say:\n- What the invention is\n- Who uses it\n- How it works\n- And explain how it changed human society.",
    vocab: "the global internet - mạng internet toàn cầu\ndemocratize information - bình đẳng hóa thông tin\ninstantaneous communication - giao tiếp tức thì",
    answer: "🌐 The Internet is arguably the most revolutionary invention in human history. → 🔗 It interconnected billions of humans and computing systems across continents. → 📚 It democratized access to education, ignited global e-commerce, → 🚀 and enabled instantaneous communication. → 💡 It dismantled geographical barriers and accelerated scientific progress exponentially."
  },
  {
    id: 25,
    category: "Technology & Gadgets",
    topic: "Describe a website you visit regularly",
    question: "Describe a website you visit regularly.",
    cueCardPrompt: "You should say:\n- What website it is\n- How you found it\n- What information it provides\n- And explain why you visit it often.",
    vocab: "open-source repository - kho lưu trữ mã nguồn mở\ncutting-edge development - phát triển công nghệ tiên tiến\ncollaborative coding - lập trình cộng tác",
    answer: "💻 I visit GitHub.com every single day. → 📂 It is the world's largest open-source development platform → 🤝 where millions of software engineers share and collaborate on code. → 💡 Browsing cutting-edge projects and documentation → 🚀 helps me upgrade my engineering skills and stay abreast of the latest tech trends."
  },

  // 6. Websites & Mobile Apps
  {
    id: 26,
    category: "Websites & Mobile Apps",
    topic: "Describe a mobile app you find very useful",
    question: "Describe a mobile app you find very useful.",
    cueCardPrompt: "You should say:\n- What app it is\n- What functions it provides\n- How often you use it\n- And explain why it is so useful.",
    vocab: "spaced repetition system - hệ thống lặp lại ngắt quãng\ngamified learning - phương pháp học trò chơi hóa\nvocabulary retention - ghi nhớ từ vựng lâu dài",
    answer: "📱 Anki is a language learning app I rely on daily. → 🧠 Utilizing an intelligent spaced-repetition algorithm, → 🗂️ it presents vocabulary flashcards just before my brain forgets them. → ⏱️ Spending 15 minutes reviewing cards during morning commutes → 📈 has expanded my academic vocabulary retention dramatically."
  },
  {
    id: 27,
    category: "Websites & Mobile Apps",
    topic: "Describe an online service that saves your time",
    question: "Describe an online service that saves your time.",
    cueCardPrompt: "You should say:\n- What the service is\n- What you order through it\n- How reliable it is\n- And explain how it saves your time.",
    vocab: "digital grocery delivery - giao hàng tạp hóa trực tuyến\nstreamlined logistics - quy trình giao nhận tối ưu\ncurated organic produce - nông sản hữu cơ chọn lọc",
    answer: "🛒 On-demand grocery delivery platforms save me hours every week. → 📱 With a few taps, fresh organic vegetables and meat are delivered to my door in 30 minutes. → ⚡ It eliminates the need to battle supermarket queues and traffic jams, → 🥗 ensuring my household always has nutritious ingredients for cooking."
  },
  {
    id: 28,
    category: "Websites & Mobile Apps",
    topic: "Describe a social media feature you enjoy using",
    question: "Describe a social media feature you enjoy using.",
    cueCardPrompt: "You should say:\n- What feature it is\n- What platform it belongs to\n- How you use it\n- And explain why you enjoy it.",
    vocab: "ephemeral stories - mẩu tin ngắn 24 giờ\nauthentic snippets - khoảnh khắc chân thực\nunfiltered daily life - cuộc sống mộc mạc không chỉnh sửa",
    answer: "📸 I enjoy the 24-hour Story feature on Instagram. → 📱 It allows users to post candid photos and short video clips that disappear after one day. → ☕ Unlike curated permanent profile posts, stories feel authentic and spontaneous, → 💬 making it effortless to share micro-moments of my daily coffee, books, and workouts."
  },
  {
    id: 29,
    category: "Websites & Mobile Apps",
    topic: "Describe an educational platform you used recently",
    question: "Describe an educational platform you used recently.",
    cueCardPrompt: "You should say:\n- What platform it is\n- What courses you took\n- Who the instructors were\n- And explain what you gained from it.",
    vocab: "prestigious universities - các trường đại học danh giá\nself-paced curriculum - giáo trình tự học linh hoạt\nindustry-standard certification - chứng chỉ chuẩn ngành",
    answer: "🎓 Coursera is an exceptional e-learning platform I utilized recently. → 🏛️ I completed a course on Machine Learning taught by Stanford University professors. → 💻 The combination of structured video lectures, coding assignments, and peer forums → 🧠 deepened my algorithmic understanding and earned me a valuable industry certification."
  },
  {
    id: 30,
    category: "Websites & Mobile Apps",
    topic: "Describe an app that helps you manage health or fitness",
    question: "Describe an app that helps you manage health or fitness.",
    cueCardPrompt: "You should say:\n- What app it is\n- What metrics it tracks\n- How it motivates you\n- And explain how it improved your health.",
    vocab: "biometric tracking - theo dõi sinh trắc học\ncalorie expenditure - mức tiêu hao calo\nmaintain accountability - duy trì tinh thần trách nhiệm",
    answer: "🏃 Strava is my favorite fitness tracking application. → ⏱️ Using GPS, it logs running distance, elevation, pace, and heart rate metrics. → 🏆 Its community leaderboards and badge milestones → 💪 motivate me to lace up my running shoes consistently four times a week."
  },

  // 7. Special Events & Celebrations
  {
    id: 31,
    category: "Special Events & Celebrations",
    topic: "Describe a wedding you attended recently",
    question: "Describe a wedding you attended recently.",
    cueCardPrompt: "You should say:\n- Whose wedding it was\n- Where the ceremony took place\n- What special moments occurred\n- And explain how you felt during the event.",
    vocab: "heartfelt vows - lời thề nguyện chân thành\njoyous atmosphere - không khí hân hoan\nradiant happiness - niềm hạnh phúc rạng ngời",
    answer: "💍 Last month, I attended my best friend's wedding at a scenic lakeside venue. → 🌸 The outdoor ceremony was adorned with white orchids and fairy lights. → 😭 When the bride and groom exchanged heartfelt emotional vows, → 👏 all guests were deeply moved. → 🥳 The banquet that followed was filled with laughter, music, and celebratory toasts."
  },
  {
    id: 32,
    category: "Special Events & Celebrations",
    topic: "Describe a birthday party that was special to you",
    question: "Describe a birthday party that was special to you.",
    cueCardPrompt: "You should say:\n- Whose birthday it was\n- What surprise was prepared\n- Who attended\n- And explain why it was memorable.",
    vocab: "surprise gathering - buổi tụ họp bất ngờ\ncherished tokens - món quà kỷ niệm ý nghĩa\nwarmth of camaraderie - tình bằng hữu ấm áp",
    answer: "🎂 On my 20th birthday, my close friends threw a surprise party at a rooftop lounge. → 🙈 I walked in expecting a quiet dinner, only to be greeted by cheering friends, handwritten cards, and a custom guitar cake. → 🎸 We sang acoustic songs under the starlit sky until midnight. → ❤️ It made me feel profoundly grateful for sincere lifelong friendships."
  },
  {
    id: 33,
    category: "Special Events & Celebrations",
    topic: "Describe a sports event you watched live",
    question: "Describe a sports event you watched live.",
    cueCardPrompt: "You should say:\n- What match it was\n- Where it was held\n- What the crowd was like\n- And explain why it was thrilling.",
    vocab: "electric stadium atmosphere - không khí sân vận động cuồng nhiệt\nnail-biting finish - kết thúc nghẹt thở hồi hộp\ncollective euphoria - niềm hân hoan chung",
    answer: "⚽ I watched the national football team play at My Dinh Stadium during the championship semifinals. → 🏟️ Forty thousand fans wore red jerseys, waving national flags and chanting in unison. → ⚡ In the 89th minute, a stunning header clinched victory, → 💥 sending the entire stadium into collective euphoria. → 🤩 Experiencing that electric energy live was sensational."
  },
  {
    id: 34,
    category: "Special Events & Celebrations",
    topic: "Describe a family celebration you enjoyed",
    question: "Describe a family celebration you enjoyed.",
    cueCardPrompt: "You should say:\n- What the occasion was\n- Who was there\n- What delicious food was prepared\n- And explain why you enjoyed it.",
    vocab: "milestone anniversary - lễ kỷ niệm cột mốc\nculinary feast - bữa tiệc ẩm thực thịnh soạn\nintergenerational bonding - gắn kết đa thế hệ",
    answer: "🎉 My grandparents' 50th golden wedding anniversary was a heartfelt celebration. → 👨‍👩‍👧‍👦 Three generations of our family gathered at a garden restaurant. → 🍲 We shared traditional home-cooked delicacies, watched a slideshow of vintage family photographs, → 📜 and listened to grandparents recounting their youth. → ❤️ It reinforced our intergenerational bond and family values."
  },
  {
    id: 35,
    category: "Special Events & Celebrations",
    topic: "Describe an achievement ceremony or graduation",
    question: "Describe an achievement ceremony or graduation.",
    cueCardPrompt: "You should say:\n- What ceremony it was\n- Where it was hosted\n- What honors were given\n- And explain how you felt.",
    vocab: "commencement ceremony - lễ tốt nghiệp trang trọng\nacademic cap and gown - mũ và áo thụng cử nhân\nculmination of hard work - kết tinh của sự nỗ lực",
    answer: "🎓 My university commencement ceremony in the grand auditorium was deeply inspiring. → 👨‍🎓 Dressed in academic gowns and caps, we stood alongside professors and proud parents. → 📜 Walking across the stage to receive my bachelor's degree diploma → 🥹 was the emotional culmination of four years of rigorous study and perseverance."
  },

  // 8. Childhood Memories
  {
    id: 36,
    category: "Childhood Memories",
    topic: "Describe a childhood game you enjoyed playing",
    question: "Describe a childhood game you enjoyed playing.",
    cueCardPrompt: "You should say:\n- What game it was\n- Who you played with\n- What the rules were\n- And explain why you loved it.",
    vocab: "hide-and-seek - trốn tìm\nneighborhood courtyard - khoảng sân khu tập thể\ninventive hiding spots - nơi ẩn nấp sáng tạo",
    answer: "🏃 As a child, I spent hours playing hide-and-seek in our neighborhood courtyard. → 🏘️ After school, a dozen kids would gather while one counted to twenty. → 🌳 We hid behind ancient banyan trees, staircases, and wooden gates. → 😄 The sheer thrill of sneaking back to base without being caught filled our childhood with pure laughter."
  },
  {
    id: 37,
    category: "Childhood Memories",
    topic: "Describe a favorite toy from your childhood",
    question: "Describe a favorite toy from your childhood.",
    cueCardPrompt: "You should say:\n- What toy it was\n- Who gave it to you\n- How you played with it\n- And explain why it was special.",
    vocab: "Lego building set - bộ xếp hình Lego\narchitectural structures - các công trình kiến trúc\nfuel creativity - nuôi dưỡng sức sáng tạo",
    answer: "🧱 My favorite childhood toy was a large box of colorful Lego building blocks gifted by my father. → 🏰 I would spend entire weekends constructing elaborate castles, futuristic spacecraft, and bridges. → 🧠 It allowed my imagination to manifest physically, → 💡 and sparked my lifelong fascination with engineering and structural design."
  },
  {
    id: 38,
    category: "Childhood Memories",
    topic: "Describe a teacher from your primary school who influenced you",
    question: "Describe a teacher from your primary school who influenced you.",
    cueCardPrompt: "You should say:\n- Who this teacher was\n- What subject they taught\n- What qualities they possessed\n- And explain how they influenced you.",
    vocab: "encouraging demeanor - phong thái khích lệ\npainstaking patience - sự kiên nhẫn hết lòng\ninstill self-confidence - gieo vào sự tự tin",
    answer: "👩‍🏫 My fourth-grade literature teacher, Ms. Hoa, had a profound impact on my life. → 📖 She noticed that I was timid and encouraged me to read aloud my essays in class. → ✍️ Her warm praise and constructive feedback → 💡 transformed my fear into a genuine passion for writing and self-expression."
  },
  {
    id: 39,
    category: "Childhood Memories",
    topic: "Describe a childhood friend you remember well",
    question: "Describe a childhood friend you remember well.",
    cueCardPrompt: "You should say:\n- Who this friend was\n- How you met\n- What activities you shared\n- And explain why you remember them.",
    vocab: "inseparable companions - đôi bạn thân không rời\nshared mischief - những trò nghịch ngợm chung\nnostalgic memories - kỷ niệm hoài niệm",
    answer: "👦 My childhood best friend was Nam, who lived right across the street. → 🚲 We rode bicycles together, caught dragonflies in summer, and swapped comic books every week. → 🤝 We shared both childish mischief and dreams for the future. → 🌅 Although we now live in different cities, those innocent memories remain etched in my heart."
  },
  {
    id: 40,
    category: "Childhood Memories",
    topic: "Describe an outdoor activity you did as a child",
    question: "Describe an outdoor activity you did as a child.",
    cueCardPrompt: "You should say:\n- What activity it was\n- Where you did it\n- Who was with you\n- And explain why you enjoyed it.",
    vocab: "kite flying - thả diều trên đê\nsummer breeze - làn gió mùa hè\nsense of boundless freedom - cảm giác tự do vô tận",
    answer: "🪁 Flying bamboo kites on the countryside river dyke is my fondest outdoor memory. → 🌾 In windy summer afternoons, my grandfather and I crafted kites out of paper and bamboo frames. → ☁️ Watching our kite soar gracefully into the azure sky → 😌 gave me an unforgettable feeling of peace and boundless freedom."
  },

  // 9. Achievements & Success
  {
    id: 41,
    category: "Achievements & Success",
    topic: "Describe a goal you set and achieved successfully",
    question: "Describe a goal you set and achieved successfully.",
    cueCardPrompt: "You should say:\n- What the goal was\n- How you prepared for it\n- What challenges you overcame\n- And explain how you felt when you achieved it.",
    vocab: "rigorous discipline - kỷ luật nghiêm ngặt\nsurpass target score - vượt mức điểm mục tiêu\ntestament to hard work - minh chứng cho sự chăm chỉ",
    answer: "🎯 Achieving an 8.0 overall in the IELTS exam was a major personal goal. → 📚 I dedicated six months to rigorous daily practice, analyzing academic articles, and recording my speaking responses. → ⏰ Balancing study with a full-time job required immense discipline. → 🥳 When the test results arrived, it was a gratifying testament that structured effort pays off."
  },
  {
    id: 42,
    category: "Achievements & Success",
    topic: "Describe a competition you took part in",
    question: "Describe a competition you took part in.",
    cueCardPrompt: "You should say:\n- What competition it was\n- What project you presented\n- What the result was\n- And explain what you learned from it.",
    vocab: "hackathon competition - cuộc thi lập trình nhanh\nprototype under pressure - phát triển mẫu thử dưới áp lực\ncollaborative synergy - sự ăn ý khi hợp tác",
    answer: "💻 I participated in a 48-hour national software hackathon with three teammates. → ⚡ We built an AI-powered waste sorting app from scratch without sleeping. → 🏆 We won the runner-up innovation prize among 50 competing teams. → 🤝 It proved how powerful teamwork and fast iterative prototyping can be under intense pressure."
  },
  {
    id: 43,
    category: "Achievements & Success",
    topic: "Describe a difficult skill you learned",
    question: "Describe a difficult skill you learned.",
    cueCardPrompt: "You should say:\n- What skill it was\n- How you learned it\n- Why it was difficult\n- And explain how it helped you.",
    vocab: "public speaking - kỹ năng thuyết trình trước đám đông\novercome stage fright - vượt qua nỗi sợ sân khấu\narticulate persuasively - diễn đạt thuyết phục",
    answer: "🎤 Mastering public speaking was the most challenging skill I acquired. → 😰 I used to suffer from severe stage fright with trembling hands. → 🗣️ By joining a public speaking club, practicing impromptu speeches weekly, and studying body language, → 📈 I can now present technical proposals confidently before hundreds of professionals."
  },
  {
    id: 44,
    category: "Achievements & Success",
    topic: "Describe a time you solved a difficult problem at work or study",
    question: "Describe a time you solved a difficult problem at work or study.",
    cueCardPrompt: "You should say:\n- What the problem was\n- What steps you took\n- How others reacted\n- And explain why your solution was successful.",
    vocab: "critical bug - lỗi phần mềm nghiêm trọng\nsystematic debugging - tìm và sửa lỗi có hệ thống\nrestore system stability - khôi phục sự ổn định của hệ thống",
    answer: "⚙️ Right before a major product launch, a critical database synchronization bug caused system crashes. → 🔍 I stayed late, systematically analyzed server logs, and traced the bottleneck to an inefficient query. → 💻 Rewriting the database logic resolved the issue and restored full system stability, → 👏 earning warm commendation from our project director."
  },
  {
    id: 45,
    category: "Achievements & Success",
    topic: "Describe a proud moment in your life",
    question: "Describe a proud moment in your life.",
    cueCardPrompt: "You should say:\n- What happened\n- When it occurred\n- Who shared the moment with you\n- And explain why you felt proud.",
    vocab: "merit scholarship - học bổng thành tích xuất sắc\nrelieve financial burden - giảm bớt gánh nặng tài chính\ntears of joy - giọt nước mắt hạnh phúc",
    answer: "🎓 Winning a full merit university scholarship was my proudest moment. → 📬 When the official admission letter arrived, → 👨‍👩‍👧‍👦 I showed it to my parents, and seeing tears of joy in their eyes was priceless. → ❤️ It relieved our family's financial burden and validated years of tireless academic pursuit."
  },

  // 10. Challenges & Difficult Times
  {
    id: 46,
    category: "Challenges & Difficult Times",
    topic: "Describe a challenging decision you had to make",
    question: "Describe a challenging decision you had to make.",
    cueCardPrompt: "You should say:\n- What decision it was\n- What options you weighed\n- What you chose\n- And explain why it was difficult.",
    vocab: "career crossroads - ngã rẽ sự nghiệp\ncomfort zone - vùng an toàn\nleap of faith - bước nhảy liều lĩnh đầy niềm tin",
    answer: "💼 Deciding to leave a stable corporate job to join an early-stage tech startup was tough. → ⚖️ I weighed steady corporate benefits against the high risks but immense learning curve of a startup. → 🚀 I took the leap of faith, and while the workload was intense, → 🧠 it accelerated my professional growth far beyond expectations."
  },
  {
    id: 47,
    category: "Challenges & Difficult Times",
    topic: "Describe a time you faced a time-pressured situation",
    question: "Describe a time you faced a time-pressured situation.",
    cueCardPrompt: "You should say:\n- What task you needed to finish\n- Why the deadline was tight\n- How you managed your time\n- And explain how you felt afterward.",
    vocab: "tight crunch - giai đoạn nước rút áp lực\n ruthless prioritization - sắp xếp thứ tự ưu tiên dứt khoát\ndeliver flawless results - đem lại kết quả hoàn hảo",
    answer: "⏰ During final university exams, I had to submit a 30-page research dissertation within 48 hours. → 📋 I created an hourly schedule, eliminated all phone notifications, and worked in focused 90-minute blocks. → 📄 Delivering the completed dissertation on time with flawless formatting → 😮‍💨 brought immense relief and boosted my time-management confidence."
  },
  {
    id: 48,
    category: "Challenges & Difficult Times",
    topic: "Describe a time you helped someone solve a problem",
    question: "Describe a time you helped someone solve a problem.",
    cueCardPrompt: "You should say:\n- Who you helped\n- What problem they faced\n- How you assisted them\n- And explain how you felt helping them.",
    vocab: "troubleshoot technical issues - khắc phục sự cố kỹ thuật\npay it forward - đền đáp và chia sẻ lòng tốt\nmutual trust - sự tin tưởng lẫn nhau",
    answer: "🤝 I assisted a junior colleague who was overwhelmed with building their first React frontend application. → 💻 I sat beside them for an afternoon, explaining component lifecycle architecture and debugging code errors together. → 💡 Seeing their confidence return when the application functioned seamlessly → 😊 gave me deep satisfaction."
  },
  {
    id: 49,
    category: "Challenges & Difficult Times",
    topic: "Describe a time you made a mistake and learned from it",
    question: "Describe a time you made a mistake and learned from it.",
    cueCardPrompt: "You should say:\n- What mistake you made\n- What the consequences were\n- How you rectified it\n- And explain what lesson you learned.",
    vocab: "missed detail - chi tiết bị bỏ sót\ntake full accountability - nhận toàn bộ trách nhiệm\nconstructive feedback - phản hồi mang tính xây dựng",
    answer: "📝 Early in my career, I sent a project report containing minor formatting inconsistencies to an important client. → 🤦 Realizing my error, I immediately notified my manager, apologized to the client, and resent a revised version. → 💡 It taught me the vital importance of double-checking details and taking prompt accountability for mistakes."
  },
  {
    id: 50,
    category: "Challenges & Difficult Times",
    topic: "Describe an experience when you adapted to a major change",
    question: "Describe an experience when you adapted to a major change.",
    cueCardPrompt: "You should say:\n- What change occurred\n- How it affected your routine\n- What steps you took to adapt\n- And explain how it shaped you.",
    vocab: "remote work transition - chuyển đổi sang làm việc từ xa\nself-regulation - khả năng tự điều chỉnh\nhealthy work-life boundary - ranh giới làm việc và nghỉ ngơi lành mạnh",
    answer: "🏠 Transitioning to fully remote work during the pandemic was a substantial adjustment. → 💻 Without the physical boundary of an office, work and personal life easily blurred. → 🧘 I established a dedicated home workstation, maintained strict start-and-stop hours, and exercised daily, → 💪 cultivating strong self-discipline and flexibility."
  },

  // 11. Books & Literature
  {
    id: 51,
    category: "Books & Literature",
    topic: "Describe a book that had a profound effect on you",
    question: "Describe a book that had a profound effect on you.",
    cueCardPrompt: "You should say:\n- What the book is\n- Who wrote it\n- What themes it explores\n- And explain why it affected you deeply.",
    vocab: "profound philosophy - triết lý sâu sắc\nsearch for purpose - cuộc tìm kiếm ý nghĩa cuộc đời\nunshakable inner resilience - sự kiên cường nội tâm bất diệt",
    answer: "📚 'Man's Search for Meaning' by Viktor Frankl transformed my outlook on adversity. → 📜 Chronicling his survival in concentration camps, Frankl explains that humans can endure any hardship if they have a clear purpose. → 💡 It taught me that while we cannot control every external event, → 🧘 we always retain the freedom to choose our attitude."
  },
  {
    id: 52,
    category: "Books & Literature",
    topic: "Describe a fiction novel you enjoyed reading",
    question: "Describe a fiction novel you enjoyed reading.",
    cueCardPrompt: "You should say:\n- What the novel is\n- Who the author is\n- What the storyline involves\n- And explain why you enjoyed it.",
    vocab: "rich allegorical tale - câu chuyện ngụ ngôn giàu ý nghĩa\npursue personal destiny - theo đuổi vận mệnh của bản thân\npoetic prose - lời văn đậm chất thơ",
    answer: "📖 I loved reading 'The Alchemist' by Paulo Coelho. → 🌾 It follows a young Andalusian shepherd boy named Santiago on a mystical journey to Egyptian pyramids in search of treasure. → ✨ The novel's poetic philosophy emphasizes listening to one's heart and embracing the omens of life, → 🌟 making it an inspiring masterpiece."
  },
  {
    id: 53,
    category: "Books & Literature",
    topic: "Describe a book you would recommend to others",
    question: "Describe a book you would recommend to others.",
    cueCardPrompt: "You should say:\n- What book it is\n- What practical advice it gives\n- Who would benefit from it\n- And explain why you recommend it.",
    vocab: "habit formation - sự hình thành thói quen\ncompound growth - sự tăng trưởng kép\nactionable strategies - các chiến lược thực tế",
    answer: "💡 I wholeheartedly recommend 'Atomic Habits' by James Clear. → 📈 It reveals how tiny 1% daily improvements compound into massive life transformations over time. → 📋 Offering actionable frameworks like habit stacking and environment design, → 🚀 it is an essential guide for anyone seeking productivity and sustainable personal growth."
  },
  {
    id: 54,
    category: "Books & Literature",
    topic: "Describe a library or bookstore you like visiting",
    question: "Describe a library or bookstore you like visiting.",
    cueCardPrompt: "You should say:\n- Where it is\n- What its atmosphere is like\n- What genres it specializes in\n- And explain why you like it.",
    vocab: "book haven - thiên đường sách\naroma of fresh coffee and roasted beans - hương cà phê thơm ngát\nwooden reading nooks - góc đọc sách bằng gỗ ấm cúng",
    answer: "📚 Nha Nam Book Cafe in Hanoi is my favorite literary haven. → ☕ It combines towering bookshelves with quiet wooden alcoves and the rich aroma of espresso. → 📖 They curate an outstanding selection of philosophy, literature, and art books, → 😌 creating a blissful retreat for afternoon reading."
  },
  {
    id: 55,
    category: "Books & Literature",
    topic: "Describe a foreign author whose works you admire",
    question: "Describe a foreign author whose works you admire.",
    cueCardPrompt: "You should say:\n- Who the author is\n- What style of writing they have\n- What famous books they wrote\n- And explain why you admire them.",
    vocab: "dystopian visionary - nhà văn viễn tưởng xuất sắc\nsocial commentary - bình luận xã hội sâu sắc\nthought-provoking prose - lời văn kích thích suy nghĩ",
    answer: "✍️ I deeply admire George Orwell for his piercing political and social critiques. → 👁️ His timeless masterpieces '1984' and 'Animal Farm' explore authoritarianism, language manipulation, and freedom. → 🧠 His clear, unflinching prose serves as an essential warning about safeguarding democratic truth."
  },

  // 12. Movies & Television Shows
  {
    id: 56,
    category: "Movies & Television Shows",
    topic: "Describe a movie that made a strong impression on you",
    question: "Describe a movie that made a strong impression on you.",
    cueCardPrompt: "You should say:\n- What movie it is\n- What genre it belongs to\n- What the plot was about\n- And explain why it impressed you.",
    vocab: "cinematic masterpiece - kiệt tác điện ảnh\nbreathtaking visual effects - kỹ xảo hình ảnh ngoạn mục\nhaunting musical score - nhạc phim ám ảnh day dứt",
    answer: "🎬 'Interstellar' directed by Christopher Nolan is a sci-fi masterpiece that mesmerized me. → 🚀 It depicts astronauts travelling through a wormhole to find a habitable exoplanet for humanity. → 🌌 Beyond its breathtaking cosmological visuals and Hans Zimmer's organ score, → ❤️ its emotional core explores how love transcends dimensions of time and space."
  },
  {
    id: 57,
    category: "Movies & Television Shows",
    topic: "Describe a documentary that taught you something important",
    question: "Describe a documentary that taught you something important.",
    cueCardPrompt: "You should say:\n- What documentary it is\n- What subject it covers\n- What facts you learned\n- And explain why it was educational.",
    vocab: "environmental documentary - phim tài liệu môi trường\nbiodiversity loss - sự mất mát đa dạng sinh học\nurgent call to action - lời kêu gọi hành động cấp bách",
    answer: "🌍 'Our Planet' narrated by Sir David Attenborough was deeply educational. → 🐾 Through astonishing 4K cinematography, it exposes the fragile beauty of Earth's ecosystems and the severe threat of biodiversity loss. → 🌿 It served as a poignant wake-up call about our collective responsibility to preserve natural habitats."
  },
  {
    id: 58,
    category: "Movies & Television Shows",
    topic: "Describe a movie character you found interesting",
    question: "Describe a movie character you found interesting.",
    cueCardPrompt: "You should say:\n- Who the character is\n- What movie they appeared in\n- What their personality was like\n- And explain why you found them interesting.",
    vocab: "complex psychological depth - chiều sâu tâm lý phức tạp\nmoral ambiguity - sự nhập nhằng về đạo đức\nstellar performance - màn trình diễn xuất chúng",
    answer: "🎭 The Joker played by Joaquin Phoenix in the film 'Joker' was unforgettable. → 🏙️ The character depicts a vulnerable, neglected clown spiraling into psychological unraveling amidst a harsh Gotham society. → 🧠 The nuanced acting and exploration of societal empathy made the character both tragic and chilling."
  },
  {
    id: 59,
    category: "Movies & Television Shows",
    topic: "Describe a television series you binge-watched",
    question: "Describe a television series you binge-watched.",
    cueCardPrompt: "You should say:\n- What series it was\n- What the genre was\n- How many episodes you watched\n- And explain why it was addictive.",
    vocab: "suspenseful cliffhanger - đoạn kết hồi hộp gay cấn\nintricate plotline - cốt truyện phức tạp lôi cuốn\nriveting drama - kịch bản kịch tính hấp dẫn",
    answer: "📺 I binge-watched 'Stranger Things' on Netflix over a single weekend. → 🚲 Set in the 1980s, it blends supernatural mystery, nostalgic synth music, and endearing friendships. → 👾 Each episode ended on a nail-biting cliffhanger that made it virtually impossible to turn off the screen."
  },
  {
    id: 60,
    category: "Movies & Television Shows",
    topic: "Describe an actor or actress you respect",
    question: "Describe an actor or actress you respect.",
    cueCardPrompt: "You should say:\n- Who they are\n- What famous roles they played\n- What qualities you admire\n- And explain why you respect them.",
    vocab: "chameleon-like versatility - khả năng biến hóa đa dạng\nmethod acting dedication - sự tận tụy hết mình với vai diễn\nhumble philanthropy - hoạt động từ thiện khiêm nhường",
    answer: "🌟 I hold immense respect for Keanu Reeves. → 🎬 Renowned for starring in 'The Matrix' and 'John Wick', he is equally famous for his genuine humility and generous charitable donations. → 🤝 Despite personal tragedies, he treats crew members with profound kindness, setting a golden standard for celebrity integrity."
  },

  // 13. Music & Concerts
  {
    id: 61,
    category: "Music & Concerts",
    topic: "Describe a live music performance you enjoyed",
    question: "Describe a live music performance you enjoyed.",
    cueCardPrompt: "You should say:\n- Where and when it took place\n- Who performed\n- What the stage and crowd were like\n- And explain why it was memorable.",
    vocab: "electric atmosphere - không khí sôi động\nlive acoustic rendition - bản phối mộc trực tiếp\ncollective singing - hàng ngàn người cùng hòa giọng",
    answer: "🎸 An outdoor indie music concert at Hanoi Opera Garden was magical. → 🎤 Popular singer Vu performed his soulful acoustic ballads under starry skies. → 🎶 When thousands of audience members illuminated their phone flashlights and sang along in unison, → ✨ the emotional harmony sent chills down my spine."
  },
  {
    id: 62,
    category: "Music & Concerts",
    topic: "Describe a song that holds special meaning to you",
    question: "Describe a song that holds special meaning to you.",
    cueCardPrompt: "You should say:\n- What song it is\n- Who sings it\n- When you first heard it\n- And explain why it is special to you.",
    vocab: "uplifting melody - giai điệu nâng đỡ tinh thần\nlyrical depth - ca từ sâu sắc\nsource of comfort - nguồn an ủi xoa dịu",
    answer: "🎵 'Fix You' by Coldplay holds an irreplaceable place in my heart. → 🎧 I first heard it during a difficult exam period when I felt completely overwhelmed. → 💡 Its gentle piano crescendo and message that light will guide you home → 😌 provided immense solace and reminded me that hardships are temporary."
  },
  {
    id: 63,
    category: "Music & Concerts",
    topic: "Describe a musical instrument you would like to master",
    question: "Describe a musical instrument you would like to master.",
    cueCardPrompt: "You should say:\n- What instrument it is\n- Why you chose it\n- How difficult it is to learn\n- And explain how you would feel playing it.",
    vocab: "acoustic guitar - đàn ghi-ta mộc\nexpressive versatility - tính biểu cảm đa dạng\nstrum gentle chords - gảy những hợp âm êm dịu",
    answer: "🎸 I have always wanted to master the acoustic guitar. → 🎶 Its portable nature and expressive harmonic versatility make it the perfect instrument for casual gatherings. → 🎼 Strumming gentle acoustic chords while singing by a campfire with friends → 🌅 is a creative dream I aim to fulfill."
  },
  {
    id: 64,
    category: "Music & Concerts",
    topic: "Describe a traditional musical genre in your country",
    question: "Describe a traditional musical genre in your country.",
    cueCardPrompt: "You should say:\n- What genre it is\n- What instruments are used\n- On what occasions it is performed\n- And explain why it is culturally valuable.",
    vocab: "UNESCO intangible heritage - di sản phi vật thể thế giới\nfolk ballad - làn điệu dân ca\nmelodic dialogue - lối hát đối đáp giao duyên",
    answer: "🌾 Quan Ho folk singing from Bac Ninh province is a treasured UNESCO intangible cultural heritage. → 🛶 Male and female singers in traditional silk costumes perform lyrical alternating verses on dragon boats. → 📜 Accompanied by traditional monochords and flutes, it embodies Vietnamese elegance and community hospitality."
  },
  {
    id: 65,
    category: "Music & Concerts",
    topic: "Describe a music band you enjoy listening to",
    question: "Describe a music band you enjoy listening to.",
    cueCardPrompt: "You should say:\n- What band it is\n- What genre they play\n- How long you have followed them\n- And explain why you enjoy their music.",
    vocab: "indie rock band - ban nhạc indie rock\npoetic lyrics - ca từ đậm chất thơ\nrelatable storytelling - câu chuyện gần gũi",
    answer: "🥁 I am an avid listener of the Vietnamese indie band Ngot. → 🎸 Their music blends upbeat pop-rock rhythms with philosophical, witty lyrics reflecting modern urban youth life. → 🎧 Their inventive chord progressions and candid storytelling make their albums consistently refreshing and deeply relatable."
  },

  // 14. Environmental Protection & Nature
  {
    id: 66,
    category: "Environmental Protection & Nature",
    topic: "Describe an environmental initiative in your community",
    question: "Describe an environmental initiative in your community.",
    cueCardPrompt: "You should say:\n- What the initiative is\n- Who participates in it\n- What actions are taken\n- And explain what impact it created.",
    vocab: "community cleanup campaign - chiến dịch dọn rác cộng đồng\nsegregate plastic waste - phân loại rác thải nhựa\nraise ecological awareness - nâng cao nhận thức sinh thái",
    answer: "♻️ In my neighborhood, we launched a 'Green Sunday' cleanup initiative. → 🧤 Every month, residents gather to collect single-use plastics along local canals and plant shade trees in public alleys. → 🌿 In addition to beautifying the area, → 👥 it fostered strong environmental consciousness among children and adults alike."
  },
  {
    id: 67,
    category: "Environmental Protection & Nature",
    topic: "Describe an animal you find fascinating",
    question: "Describe an animal you find fascinating.",
    cueCardPrompt: "You should say:\n- What animal it is\n- Where it lives\n- What special behaviors it has\n- And explain why it is fascinating.",
    vocab: "marine mammal - động vật có vú ở biển\nhigh cognitive intelligence - trí thông minh nhận thức cao\necholocation - khả năng định vị bằng tiếng vang",
    answer: "🐬 Dolphins are among the most fascinating creatures on Earth. → 🌊 Inhabiting oceans worldwide, they possess complex social structures, playful personalities, and communicate through intricate clicks and whistles. → 🧠 Their remarkable cognitive empathy and ability to navigate using echolocation showcase the wonders of marine evolution."
  },
  {
    id: 68,
    category: "Environmental Protection & Nature",
    topic: "Describe a plant or flower that is important in your country",
    question: "Describe a plant or flower that is important in your country.",
    cueCardPrompt: "You should say:\n- What plant/flower it is\n- Where it grows\n- What it symbolizes\n- And explain why it is significant.",
    vocab: "sacred national flower - quốc hoa thiêng liêng\npurity amidst adversity - sự thuần khiết vươn lên từ nghịch cảnh\ncultural emblem - biểu tượng văn hóa",
    answer: "🌸 The pink lotus is the revered national flower of Vietnam. → 🌾 Blooming gracefully in muddy village ponds throughout summer, → 🌿 it symbolizes purity, resilience, and optimism rising above hardship. → 📜 Its imagery is ubiquitous in Vietnamese art, architecture, and culinary traditions."
  },
  {
    id: 69,
    category: "Environmental Protection & Nature",
    topic: "Describe a natural landscape you would like to explore",
    question: "Describe a natural landscape you would like to explore.",
    cueCardPrompt: "You should say:\n- Where it is\n- What geographical features it has\n- What activities you would do\n- And explain why you want to visit.",
    vocab: "subterranean cave system - hệ thống hang động ngầm\nprimeval jungle - rừng nguyên sinh\nsurreal stalactites - thạch nhũ kỳ ảo",
    answer: "⛰️ Son Doong Cave in Quang Binh province is my dream natural destination. → 🌲 Recognized as the largest cave on the planet, it houses its own primeval jungle, underground river, and microclimate. → 🧗 Trekking through its colossal subterranean caverns and surreal stalactites would be the ultimate geological exploration."
  },
  {
    id: 70,
    category: "Environmental Protection & Nature",
    topic: "Describe a green habit you practice regularly",
    question: "Describe a green habit you practice regularly.",
    cueCardPrompt: "You should say:\n- What the habit is\n- When you started it\n- How it reduces pollution\n- And explain why others should adopt it.",
    vocab: "refuse single-use plastics - từ chối đồ nhựa dùng một lần\nreusable tumbler - bình nước dùng nhiều lần\nminimize carbon footprint - giảm thiểu dấu chân carbon",
    answer: "🥤 Carrying a stainless steel tumbler and reusable cloth bag everywhere is my daily green habit. → 🚫 It eliminates hundreds of disposable plastic cups and bags each year. → 💧 It is an effortless lifestyle shift that, when adopted by millions, → 🌍 can significantly curb plastic pollution in oceans and landfills."
  },

  // 15. Sports & Health Activities
  {
    id: 71,
    category: "Sports & Health Activities",
    topic: "Describe a sport or exercise you enjoy doing",
    question: "Describe a sport or exercise you enjoy doing.",
    cueCardPrompt: "You should say:\n- What sport it is\n- How often you play it\n- What equipment you need\n- And explain how it benefits your health.",
    vocab: "badminton - môn cầu lông\ncardiovascular stamina - sức bền tim mạch\nlightning-fast reflexes - phản xạ nhanh như chớp",
    answer: "🏸 Playing badminton three times a week is my primary exercise. → 👟 Requiring only a racquet and shuttlecock, it demands agile footwork, explosive jumps, and rapid reflexes. → 🏃 An intense one-hour match burns hundreds of calories, strengthens cardiovascular endurance, → 😌 and relieves daily work fatigue."
  },
  {
    id: 72,
    category: "Sports & Health Activities",
    topic: "Describe a healthy habit you developed recently",
    question: "Describe a healthy habit you developed recently.",
    cueCardPrompt: "You should say:\n- What the habit is\n- Why you started it\n- How you maintain it\n- And explain the benefits you noticed.",
    vocab: "consistent hydration - bổ sung đủ nước đều đặn\ncircadian rhythm - nhịp sinh học cơ thể\nenhanced vitality - tăng cường sức sống",
    answer: "💧 Drinking two liters of warm water daily and doing morning stretches has transformed my well-being. → 🌅 It hydrates my body after sleep, kickstarts digestion, and boosts skin vitality. → ⚡ Since adopting this habit, I experience sustained daytime focus without relying on excessive caffeine."
  },
  {
    id: 73,
    category: "Sports & Health Activities",
    topic: "Describe a physical activity you did with a team",
    question: "Describe a physical activity you did with a team.",
    cueCardPrompt: "You should say:\n- What activity it was\n- Who your teammates were\n- What the objective was\n- And explain what you enjoyed about it.",
    vocab: "relay marathon - giải chạy tiếp sức\ncollective perseverance - sự kiên trì của tập thể\nshared triumph - chiến thắng chung",
    answer: "🏃 I participated in a corporate 42-kilometer relay marathon with four colleagues. → 🏁 Each member sprinted a 10km leg, passing the baton under blazing sunshine. → 💪 Cheering each other at changeover checkpoints created immense camaraderie, → 🏆 and crossing the finish line together was an exhilarating shared triumph."
  },
  {
    id: 74,
    category: "Sports & Health Activities",
    topic: "Describe an extreme sport you would like to try",
    question: "Describe an extreme sport you would like to try.",
    cueCardPrompt: "You should say:\n- What sport it is\n- Where you would do it\n- What safety precautions are required\n- And explain why it attracts you.",
    vocab: "tandem skydiving - nhảy dù đôi mạo hiểm\nadrenaline rush - cảm giác bùng nổ adrenaline\nbird's-eye perspective - tầm nhìn bao quát từ trên cao",
    answer: "🪂 I would love to experience tandem skydiving over coastal Dubai. → ✈️ Leaping from an aircraft at 10,000 feet with an experienced instructor, → ⚡ freefalling through clouds before the parachute deploys would deliver an unparalleled adrenaline rush → 🌅 and a breathtaking bird's-eye view of Earth."
  },
  {
    id: 75,
    category: "Sports & Health Activities",
    topic: "Describe an athlete you admire",
    question: "Describe an athlete you admire.",
    cueCardPrompt: "You should say:\n- Who the athlete is\n- What sport they play\n- What records they achieved\n- And explain why they inspire you.",
    vocab: "unrelenting work ethic - tinh thần làm việc không ngừng nghỉ\npeak physical longevity - duy trì đỉnh cao thể lực bền bỉ\nchampion mindset - tư duy của nhà vô địch",
    answer: "⚽ Cristiano Ronaldo is an athlete whose discipline inspires millions. → 🏆 Even in his late thirties, his rigorous nutrition, relentless training ethic, and mental fortitude enable him to compete at the world's highest level. → 💡 He exemplifies that talent is nothing without relentless dedication."
  },

  // 16. Hobbies & Creative Skills
  {
    id: 76,
    category: "Hobbies & Creative Skills",
    topic: "Describe a creative hobby you enjoy",
    question: "Describe a creative hobby you enjoy.",
    cueCardPrompt: "You should say:\n- What hobby it is\n- How you got started\n- What equipment you use\n- And explain why you find it fulfilling.",
    vocab: "landscape photography - nhiếp ảnh phong cảnh\nframe golden-hour light - bắt trọn ánh sáng giờ vàng\npreserve fleeting moments - lưu giữ khoảnh khắc thoáng qua",
    answer: "📸 Urban landscape photography is my creative outlet. → 🌆 Armed with a mirrorless camera, I stroll through city streets at golden hour, framing contrasting shadows and vibrant street vendors. → 🎨 It trains my eye to notice beauty in mundane everyday moments → 🖼️ and provides deep artistic satisfaction."
  },
  {
    id: 77,
    category: "Hobbies & Creative Skills",
    topic: "Describe a skill you would like to learn in the future",
    question: "Describe a skill you would like to learn in the future.",
    cueCardPrompt: "You should say:\n- What skill it is\n- Why it interests you\n- How you plan to learn it\n- And explain how it will benefit you.",
    vocab: "culinary baking - làm bánh nướng nghệ thuật\nprecise chemistry of ingredients - sự chuẩn xác của nguyên liệu\nshare artisanal pastries - chia sẻ bánh thủ công thơm ngon",
    answer: "🥖 I want to learn French artisanal bread baking and pastry making. → 🌾 Crafting crisp sourdough loaves and buttery croissants requires precise fermentation and patience. → 🥐 I plan to take weekend culinary workshops to bake wholesome homemade treats for family and friends."
  },
  {
    id: 78,
    category: "Hobbies & Creative Skills",
    topic: "Describe a handicraft made in your country",
    question: "Describe a handicraft made in your country.",
    cueCardPrompt: "You should say:\n- What handicraft it is\n- How it is produced\n- Where it is made\n- And explain why it is special.",
    vocab: "conical bamboo hat - nón lá truyền thống\nmeticulous hand-stitching - đường khâu tay tỉ mỉ\ncultural emblem - biểu tượng văn hóa",
    answer: "👒 The traditional conical hat (Non La) is an iconic Vietnamese handicraft. → 🌾 Handcrafted in Chuong village from dried palm leaves and bamboo rings, → 🧵 each hat requires meticulous stitching and delicate watermarking. → ☀️ It is both a practical shield against tropical sun and an enduring symbol of Vietnamese grace."
  },
  {
    id: 79,
    category: "Hobbies & Creative Skills",
    topic: "Describe a DIY project you completed at home",
    question: "Describe a DIY project you completed at home.",
    cueCardPrompt: "You should say:\n- What you built or repaired\n- What tools you used\n- How long it took\n- And explain how satisfied you were.",
    vocab: "restoration project - dự án phục chế\nsanding and varnishing - chà nhám và phủ bóng vec-ni\npride of craftsmanship - niềm tự hào khi tự tay làm ra",
    answer: "🪑 I restored an old wooden study desk using sandpaper, natural wood stain, and varnish. → 🛠️ I spent a weekend smoothing out rough scratches and applying protective coats. → ✨ Seeing the rich natural timber grain emerge and using the desk daily → 🛋️ gave me immense pride in manual craftsmanship."
  },
  {
    id: 80,
    category: "Hobbies & Creative Skills",
    topic: "Describe an activity that helps you stay relaxed",
    question: "Describe an activity that helps you stay relaxed.",
    cueCardPrompt: "You should say:\n- What activity it is\n- Where you do it\n- How often you do it\n- And explain why it relaxes you.",
    vocab: "mindfulness meditation - thiền chánh niệm\ndeep diaphragmatic breathing - hít thở sâu bằng cơ hoành\ninner tranquility - sự an nhiên nội tâm",
    answer: "🧘 Practicing 15 minutes of mindfulness meditation every evening is my ultimate relaxation ritual. → 🛋️ Sitting quietly in a dimly lit room, focusing purely on breathing and releasing bodily tension → 😌 clears mental clutter, soothes anxiety, → 🌙 and prepares me for a deep, restorative night of sleep."
  },

  // 17. Inventions & Innovations
  {
    id: 81,
    category: "Inventions & Innovations",
    topic: "Describe an AI tool you find impressive",
    question: "Describe an AI tool you find impressive.",
    cueCardPrompt: "You should say:\n- What AI tool it is\n- What tasks it can perform\n- How you use it\n- And explain why it impresses you.",
    vocab: "large language models - mô hình ngôn ngữ lớn\naccelerate ideation - đẩy nhanh quá trình nảy sinh ý tưởng\nparadigm shift - bước chuyển dịch mang tính thời đại",
    answer: "🤖 Large language models like ChatGPT have revolutionized knowledge work. → 💡 They synthesize complex research, draft code snippets, and brainstorm creative ideas in seconds. → ⚡ Using it as an intellectual copilot has doubled my productivity and reshaped how humans interact with digital information."
  },
  {
    id: 82,
    category: "Inventions & Innovations",
    topic: "Describe a modern invention that helps the environment",
    question: "Describe a modern invention that helps the environment.",
    cueCardPrompt: "You should say:\n- What invention it is\n- How it works\n- Why it is eco-friendly\n- And explain its future potential.",
    vocab: "solar photovoltaic panels - tấm pin quang điện mặt trời\nclean renewable energy - năng lượng tái tạo sạch\ndecarbonize power grids - khử carbon lưới điện",
    answer: "☀️ Modern photovoltaic solar panels are crucial in combating climate change. → ⚡ By converting abundant sunlight directly into electricity without greenhouse emissions, → 🏡 rooftop solar empowers homes and factories to generate clean energy, accelerating the global transition toward zero-carbon power grids."
  },
  {
    id: 83,
    category: "Inventions & Innovations",
    topic: "Describe an invention from the past that remains vital today",
    question: "Describe an invention from the past that remains vital today.",
    cueCardPrompt: "You should say:\n- What invention it is\n- When it was invented\n- How people use it today\n- And explain why it is indispensable.",
    vocab: "the printing press - máy in ấn cơ học\nmass dissemination of knowledge - phổ biến kiến thức đại chúng\nbedrock of modern literacy - nền tảng của học vấn hiện đại",
    answer: "📜 Gutenberg's movable type printing press invented in the 15th century remains a monumental cornerstone of civilization. → 📚 By allowing the mass production of books, it democratized literacy, fueled scientific revolutions, → 💡 and laid the intellectual foundation for modern education."
  },
  {
    id: 84,
    category: "Inventions & Innovations",
    topic: "Describe an innovative medical technology",
    question: "Describe an innovative medical technology.",
    cueCardPrompt: "You should say:\n- What technology it is\n- What medical conditions it addresses\n- Why it is revolutionary\n- And explain how it helps patients.",
    vocab: "mRNA vaccine technology - công nghệ vắc-xin mRNA\nrapid therapeutic synthesis - tổng hợp liệu pháp nhanh chóng\ngroundbreaking immunology - bước đột phá trong miễn dịch học",
    answer: "💉 mRNA vaccine technology revolutionized modern immunology. → 🧬 Instead of using weakened viruses, it instructs human cells to produce harmless viral proteins that train the immune system. → ⚡ This modular approach enables rapid vaccine synthesis against novel pathogens and holds immense promise for cancer therapies."
  },
  {
    id: 85,
    category: "Inventions & Innovations",
    topic: "Describe a futuristic transport technology you look forward to",
    question: "Describe a futuristic transport technology you look forward to.",
    cueCardPrompt: "You should say:\n- What technology it is\n- How it would operate\n- What benefits it would bring\n- And explain why you look forward to it.",
    vocab: "hyperloop transit - hệ thống tàu siêu tốc hyperloop\nnear-vacuum sealed tubes - ống chân không kín khí\nseamless intercity travel - di chuyển liên thành phố siêu nhanh",
    answer: "🚄 Hyperloop magnetic levitation transit in near-vacuum tubes excites me greatly. → ⚡ Traveling at airline speeds exceeding 1,000 km/h with zero emissions, → 🏙️ it could connect distant metropolises in under 30 minutes, revolutionizing regional economies and making intercity commutes effortless."
  },

  // 18. Business & Work Projects
  {
    id: 86,
    category: "Business & Work Projects",
    topic: "Describe a successful business or company you admire",
    question: "Describe a successful business or company you admire.",
    cueCardPrompt: "You should say:\n- What company it is\n- What products or services it provides\n- Why it is successful\n- And explain what you admire about it.",
    vocab: "relentless customer obsession - sự tận tâm tuyệt đối với khách hàng\nlogistics infrastructure - hạ tầng kho vận logistics\nlong-term strategic vision - tầm nhìn chiến lược dài hạn",
    answer: "🏢 I admire Amazon's relentless pursuit of customer convenience and logistics innovation. → 📦 From cloud computing (AWS) to automated fulfillment centers and one-day shipping, → 🚀 their willingness to invent and execute long-term strategic visions has fundamentally transformed global commerce."
  },
  {
    id: 87,
    category: "Business & Work Projects",
    topic: "Describe a team project you worked on",
    question: "Describe a team project you worked on.",
    cueCardPrompt: "You should say:\n- What the project was\n- What your role was\n- What challenges arose\n- And explain how the team succeeded.",
    vocab: "cross-functional team - đội ngũ liên phòng ban\nagile sprint workflow - quy trình làm việc agile tinh gọn\nmeet crucial milestones - hoàn thành cột mốc quan trọng",
    answer: "👥 I led the frontend development of an e-commerce mobile application in a cross-functional team of eight. → 💻 We conducted daily standups and weekly agile sprints to iterate features rapidly. → 🎯 Open communication and mutual code reviews enabled us to launch on schedule with outstanding user ratings."
  },
  {
    id: 88,
    category: "Business & Work Projects",
    topic: "Describe an entrepreneur whose story inspired you",
    question: "Describe an entrepreneur whose story inspired you.",
    cueCardPrompt: "You should say:\n- Who the entrepreneur is\n- What business they started\n- What obstacles they overcame\n- And explain why their journey inspires you.",
    vocab: "humble origins - xuất thân khiêm tốn\nbootstrap a business - tự thân gây dựng doanh nghiệp\nunshakable persistence - lòng kiên trì không lay chuyển",
    answer: "💼 Jack Ma's journey of founding Alibaba inspires me. → 🌾 Starting as a modest English teacher with no programming background, he faced dozens of rejections before launching an e-commerce platform from his apartment. → 💪 His resilience and customer-first ethos revolutionized Chinese digital trade."
  },
  {
    id: 89,
    category: "Business & Work Projects",
    topic: "Describe a small local business you support",
    question: "Describe a small local business you support.",
    cueCardPrompt: "You should say:\n- What business it is\n- Where it is located\n- What products it sells\n- And explain why you support it.",
    vocab: "artisan coffee roastery - xưởng rang cà phê thủ công\nethically sourced beans - hạt cà phê thu mua công bằng\nwelcoming neighborhood vibe - không khí thân thiện xóm giềng",
    answer: "☕ I frequently support an independent artisan coffee roastery in my neighborhood. → 🌾 They source organic coffee beans directly from highland farmers in Da Lat, roasting small batches daily. → ❤️ Their passion for ethical trade and exceptional pour-over coffee makes them a community gem."
  },
  {
    id: 90,
    category: "Business & Work Projects",
    topic: "Describe a job you think is very important for society",
    question: "Describe a job you think is very important for society.",
    cueCardPrompt: "You should say:\n- What job it is\n- What duties it entails\n- Why it is demanding\n- And explain why it is indispensable.",
    vocab: "healthcare professionals - nhân viên y tế\nunconditional compassion - lòng trắc ẩn vô điều kiện\nbackbone of public health - xương sống của y tế cộng đồng",
    answer: "🏥 Doctors and emergency nurses are the indispensable backbone of society. → 🩺 Working exhausting shifts in high-stakes environments to save lives and heal ailments, → 💡 their scientific expertise and deep empathy maintain the health and resilience of our entire population."
  },

  // 19. Gifts & Possessions
  {
    id: 91,
    category: "Gifts & Possessions",
    topic: "Describe a meaningful gift you received",
    question: "Describe a meaningful gift you received.",
    cueCardPrompt: "You should say:\n- What the gift was\n- Who gave it to you\n- On what occasion\n- And explain why it holds emotional value.",
    vocab: "fountain pen - bút máy cao cấp\nengraved with initials - khắc chữ cái tên viết tắt\nsymbol of intellectual encouragement - biểu tượng khích lệ học tập",
    answer: "🖋️ On my high school graduation, my father gifted me an elegant fountain pen engraved with my name. → ✍️ He advised that writing down ideas clearly shapes clear thinking. → ❤️ I have used that pen to sign exam papers and important contracts, cherishing it as a symbol of my father's wisdom and belief in me."
  },
  {
    id: 92,
    category: "Gifts & Possessions",
    topic: "Describe something valuable you lost and found",
    question: "Describe something valuable you lost and found.",
    cueCardPrompt: "You should say:\n- What item it was\n- How you lost it\n- How you recovered it\n- And explain how you felt.",
    vocab: "leather wallet - ví da\npanicked search - cuộc tìm kiếm hoảng loạn\nrestored faith in humanity - củng cố niềm tin vào lòng tốt con người",
    answer: "👛 I accidentally dropped my wallet containing identification cards and bank cards on a bus. → 😰 In panic, I contacted the transit helpline, and to my immense relief, an honest bus conductor had found and safely kept it. → 🤝 Recovering it intact restored my faith in everyday human kindness."
  },
  {
    id: 93,
    category: "Gifts & Possessions",
    topic: "Describe an item of clothing you wear on special occasions",
    question: "Describe an item of clothing you wear on special occasions.",
    cueCardPrompt: "You should say:\n- What clothing it is\n- What it looks like\n- When you wear it\n- And explain why you like it.",
    vocab: "tailored wool suit - bộ âu phục len may đo\nsharp silhouette - dáng áo sắc nét thanh lịch\nboost self-assurance - tăng thêm sự tự tin",
    answer: "👔 My tailored navy-blue suit is my go-to attire for formal celebrations and presentations. → ✂️ Custom-stitched to my exact measurements, it feels remarkably comfortable yet exudes sharp elegance. → 💼 Wearing it sharpens my posture and instills confidence whenever I step into important meetings."
  },
  {
    id: 94,
    category: "Gifts & Possessions",
    topic: "Describe an electronic item you bought recently",
    question: "Describe an electronic item you bought recently.",
    cueCardPrompt: "You should say:\n- What item it was\n- Where you bought it\n- How you use it\n- And explain whether it met your expectations.",
    vocab: "e-reader tablet - máy đọc sách điện tử\ne-ink glare-free display - màn hình mực điện tử chống lóa\nportable library - thư viện di động",
    answer: "📱 I recently purchased a Kindle Paperwhite e-reader. → 📖 Its e-ink screen mimics real paper without eye fatigue, holding thousands of books in a lightweight device. → ✈️ It has made reading during daily commutes and travel extraordinarily convenient."
  },
  {
    id: 95,
    category: "Gifts & Possessions",
    topic: "Describe a gift you gave to someone that made them happy",
    question: "Describe a gift you gave to someone that made them happy.",
    cueCardPrompt: "You should say:\n- Who you gave it to\n- What the gift was\n- Why you chose it\n- And explain how they reacted.",
    vocab: "personalized photo album - album ảnh cá nhân hóa\nheartfelt nostalgia - nỗi xúc động hoài niệm chân thành\ncherished keepsake - kỷ vật quý giá",
    answer: "📸 For my mother's 50th birthday, I compiled a personalized photo book chronicling five decades of her life. → 📖 When she turned the pages, tears of joy welled in her eyes as fond memories flooded back. → ❤️ It was the most rewarding gift I ever gave."
  },

  // 20. Future Goals & Ambitions
  {
    id: 96,
    category: "Future Goals & Ambitions",
    topic: "Describe a long-term goal you hope to achieve",
    question: "Describe a long-term goal you hope to achieve.",
    cueCardPrompt: "You should say:\n- What the goal is\n- What steps you are taking\n- Why it is important to you\n- And explain how you will feel when you achieve it.",
    vocab: "found an educational startup - sáng lập công ty khởi nghiệp giáo dục\ndemocratize quality learning - bình đẳng hóa giáo dục chất lượng cao\nleave an impactful legacy - để lại di sản có giá trị",
    answer: "🎯 My ultimate ambition is to found an ed-tech startup creating interactive learning tools for underprivileged students. → 💻 I am currently building software engineering expertise and studying pedagogy. → 🌟 Empowering millions of young minds through technology would be the most fulfilling contribution of my life."
  },
  {
    id: 97,
    category: "Future Goals & Ambitions",
    topic: "Describe a country you would love to live in for a year",
    question: "Describe a country you would love to live in for a year.",
    cueCardPrompt: "You should say:\n- What country it is\n- Why you chose it\n- What you would do there\n- And explain what you hope to gain.",
    vocab: "rich cultural immersion - đắm chìm trong văn hóa phong phú\nharmony of tradition and modernity - hòa quyện giữa truyền thống và hiện đại\nbroaden global perspective - mở rộng góc nhìn toàn cầu",
    answer: "🗾 I would love to live in Japan for one year. → 🏯 From ancient temples in Kyoto to futuristic tech hubs in Tokyo, its immaculate safety, culinary excellence, and polite culture fascinate me. → 🌸 Immersing myself in Japanese language and craftsmanship would deeply enrich my global perspective."
  },
  {
    id: 98,
    category: "Future Goals & Ambitions",
    topic: "Describe an ambition you have had since childhood",
    question: "Describe an ambition you have had since childhood.",
    cueCardPrompt: "You should say:\n- What the ambition was\n- How it evolved over time\n- What you are doing toward it\n- And explain why it remains important.",
    vocab: "author a published book - viết một cuốn sách xuất bản\narticulate insights - diễn đạt những góc nhìn sâu sắc\nlifelong intellectual pursuit - hành trình trí tuệ suốt đời",
    answer: "✍️ Since childhood, I have dreamed of authoring and publishing a book on human psychology and technology. → 📚 I write articles weekly and collect real-world case studies. → 💡 Sharing structured insights that help people live more purposeful lives remains my lifelong intellectual aspiration."
  },
  {
    id: 99,
    category: "Future Goals & Ambitions",
    topic: "Describe a personal project you plan to start soon",
    question: "Describe a personal project you plan to start soon.",
    cueCardPrompt: "You should say:\n- What the project is\n- What resources you need\n- How you will execute it\n- And explain what you hope to accomplish.",
    vocab: "tech educational podcast - podcast chia sẻ công nghệ\ninterview industry experts - phỏng vấn chuyên gia đầu ngành\ndisseminate practical knowledge - lan tỏa kiến thức thực tế",
    answer: "🎙️ I plan to launch a technology podcast interviewing software engineers and startup founders. → 🎧 With a quality microphone and editing software, I will explore real-world career lessons and AI breakthroughs, → 💡 providing actionable guidance for aspiring young developers."
  },
  {
    id: 100,
    category: "Future Goals & Ambitions",
    topic: "Describe where you envision yourself in ten years",
    question: "Describe where you envision yourself in ten years.",
    cueCardPrompt: "You should say:\n- Where you hope to be living\n- What career status you desire\n- What lifestyle you want\n- And explain why this vision inspires you.",
    vocab: "technology leader - nhà lãnh đạo công nghệ\nbalanced fulfilling lifestyle - lối sống cân bằng viên mãn\nmentor the next generation - dìu dắt thế hệ kế tiếp",
    answer: "🌟 In ten years, I envision myself as a seasoned technology leader managing impactful AI products, while mentoring aspiring young innovators. → 🏡 Living in a peaceful green home with my family, enjoying health, continuous learning, → ❤️ and giving back to society represents my highest definition of success."
  }
];
