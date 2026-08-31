export interface IeltsPart1Item {
  id: number;
  category: string;
  question: string;
  vocab: string;
  answer: string;
}

export const ieltsPart1Bank: IeltsPart1Item[] = [
  // 1. Work & Study
  {
    id: 1,
    category: "Work & Study",
    question: "Are you a student or do you work?",
    vocab: "software engineer - kỹ sư phần mềm\ntech firm - công ty công nghệ\nweb applications - ứng dụng web\ncareer advancement - thăng tiến sự nghiệp",
    answer: `💼 Well, currently I work as a full-time software engineer at an international tech firm.
💻 My primary responsibility involves designing and building responsive web applications for global clients.
🏢 I have been immersed in this profession for nearly three years since graduating with honors from university.
🚀 What I appreciate most is the collaborative corporate environment that encourages continuous technological innovation.
🎯 Looking ahead, I aspire to lead my own engineering team to deliver impactful digital solutions.`
  },
  {
    id: 2,
    category: "Work & Study",
    question: "What do you like most about your job?",
    vocab: "solving complex problems - giải quyết vấn đề phức tạp\ncreative colleagues - đồng nghiệp sáng tạo\nhighly motivated - có động lực cao\nintellectual stimulation - kích thích tư duy trí tuệ",
    answer: `💡 Without a doubt, the most captivating aspect of my profession is solving complex technical problems.
🤝 On a daily basis, I collaborate closely alongside extraordinarily creative colleagues who challenge my perspectives.
🧠 Tackling intricate programming bugs provides immense intellectual stimulation and satisfaction.
🔥 This dynamic atmosphere keeps me highly motivated and eager to expand my technical skill set every single morning.`
  },
  {
    id: 3,
    category: "Work & Study",
    question: "Is there anything you dislike about your studies or work?",
    vocab: "tight project deadlines - hạn chót dự án dồn dập\nstressful - gây áp lực căng thẳng\nlong working hours - giờ làm việc kéo dài",
    answer: "😫 Occasionally, → ⏰ tight project deadlines → 💼 can be quite stressful → 😮‍💨 after long working hours."
  },
  {
    id: 4,
    category: "Work & Study",
    question: "What subject did you enjoy most at school?",
    vocab: "deeply passionate - cực kỳ đam mê\ncomputer science - khoa học máy tính\nstimulated logic - kích thích tư duy logic",
    answer: "📚 I was deeply passionate → 💻 about computer science → 💡 because it stimulated logic → 🎓 and creative thinking."
  },
  {
    id: 5,
    category: "Work & Study",
    question: "Would you like to change your current profession in the future?",
    vocab: "near future - tương lai gần\nmentor startups - cố vấn dự án khởi nghiệp\ndown the road - trong tương lai xa",
    answer: "🚀 Not in the near future, → 💼 as I truly enjoy tech, → 🎯 but I might mentor startups → 🌟 down the road."
  },

  // 2. Hometown & Accommodation
  {
    id: 6,
    category: "Hometown & Accommodation",
    question: "Where is your hometown located?",
    vocab: "vibrant capital city - thủ đô sôi động\nnestled in - nằm êm đềm tại\nrich culture - văn hóa phong phú",
    answer: "🏙️ My hometown is Hanoi, → 🇻🇳 the vibrant capital city → 🌾 nestled in northern Vietnam, → 📜 famous for rich culture."
  },
  {
    id: 7,
    category: "Hometown & Accommodation",
    question: "What do you like most about living in your hometown?",
    vocab: "street food - ẩm thực đường phố\nhospitable people - người dân hiếu khách\nneighborhood - khu phố cư dân",
    answer: "🍜 I absolutely adore → 🍢 the incredible street food → 👥 and warm hospitable people → 🌆 living in every neighborhood."
  },
  {
    id: 8,
    category: "Hometown & Accommodation",
    question: "Has your hometown changed much in recent years?",
    vocab: "tremendously - một cách kinh ngạc\nmodern high-rises - tòa nhà cao tầng hiện đại\nmetro lines - các tuyến tàu điện ngầm",
    answer: "🚀 Tremendously, → 🏗️ modern high-rises → 🚇 and new metro lines → 📈 have transformed the cityscape."
  },
  {
    id: 9,
    category: "Hometown & Accommodation",
    question: "Do you live in a house or an apartment?",
    vocab: "reside - cư trú sinh sống\ncozy high-rise apartment - căn hộ chung cư ấm cúng\nscenic balcony view - ban công tầm nhìn đẹp",
    answer: "🏢 I currently reside → 🛋️ in a cozy high-rise apartment → 🌆 with a scenic balcony view → 🌃 of the city skyline."
  },
  {
    id: 10,
    category: "Hometown & Accommodation",
    question: "What is your favorite room in your home?",
    vocab: "living room - phòng khách\nunwind - xả stress thư giãn\nbusy day - ngày làm việc bận rộn",
    answer: "🛋️ Definitely my living room, → 🎧 where I can relax → 📚 read books or listen to music → 😌 after a busy day."
  },

  // 3. Music & Media
  {
    id: 11,
    category: "Music & Media",
    question: "Do you enjoy listening to music?",
    vocab: "huge music lover - người rất yêu âm nhạc\ndaily necessity - nhu cầu thiết yếu hàng ngày\nuplift mood - nâng cao tâm trạng",
    answer: "🎶 Absolutely yes, → ❤️ I am a huge music lover → 🎧 for me it is a daily necessity → 😊 to uplift my mood."
  },
  {
    id: 12,
    category: "Music & Media",
    question: "What genre of music do you listen to most often?",
    vocab: "soft acoustic pop - nhạc pop mộc mạc nhẹ nhàng\nunwind at home - thư giãn tại nhà\nupbeat rock - nhạc rock sôi động",
    answer: "🌸 I tend to listen → 🎶 to soft acoustic pop → 😌 when relaxing at home, → 🥁 and upbeat rock at the gym."
  },
  {
    id: 13,
    category: "Music & Media",
    question: "Have you ever attended a live music concert?",
    vocab: "outdoor concert - đêm nhạc ngoài trời\nenergetic atmosphere - bầu không khí năng lượng\nunforgettable - không thể nào quên",
    answer: "🎸 Yes indeed, → 🏟️ I went to an outdoor concert → ⚡ the energetic atmosphere → 💥 was truly unforgettable."
  },
  {
    id: 14,
    category: "Music & Media",
    question: "Did you learn any musical instrument as a child?",
    vocab: "primary school - trường tiểu học\ncultivate rhythm - rèn luyện nhịp điệu\nmusical sense - cảm thụ âm nhạc",
    answer: "🎹 I learned the piano → 🎼 during primary school, → 🎵 which helped me cultivate → 🧠 musical rhythm early on."
  },
  {
    id: 15,
    category: "Music & Media",
    question: "Is music education important for children?",
    vocab: "brain development - phát triển não bộ\nenhances creativity - tăng cường khả năng sáng tạo\nrelieves academic stress - giảm áp lực học tập",
    answer: "💡 Undeniably yes, → 🧠 it stimulates brain development → 🎨 enhances creativity → 😌 and relieves academic stress."
  },

  // 4. Hobbies & Free Time
  {
    id: 16,
    category: "Hobbies & Free Time",
    question: "What do you usually do in your leisure time?",
    vocab: "leisure time - thời gian rảnh rỗi\noutdoor cycling - đạp xe ngoài trời\ntech blogs - trang tin công nghệ",
    answer: "🏃 In my free hours, → 🚴 I love outdoor cycling → 📚 reading tech blogs → ☕ and enjoying coffee with friends."
  },
  {
    id: 17,
    category: "Hobbies & Free Time",
    question: "Do you prefer spending free time indoors or outdoors?",
    vocab: "nature parks - công viên tự nhiên\nsoak up fresh air - hít thở không khí lành\nrecharge energy - nạp lại năng lượng",
    answer: "🌿 I prefer being outdoors → 🌳 in nature parks → ☀️ to soak up fresh air → 😌 and recharge my energy."
  },
  {
    id: 18,
    category: "Hobbies & Free Time",
    question: "Did you have different hobbies when you were younger?",
    vocab: "childhood games - trò chơi tuổi thơ\nvideo games - trò chơi điện tử\nreading habits - thói quen đọc sách",
    answer: "⚽ As a kid, → 🏃 I spent hours playing football → 🎮 and video games, → 📚 whereas now I prefer reading."
  },
  {
    id: 19,
    category: "Hobbies & Free Time",
    question: "How much free time do you get on weekdays?",
    vocab: "work tasks - nhiệm vụ công việc\nunwind - nghỉ ngơi xả hơi\nexercise - tập luyện thể thao",
    answer: "⏰ Only about two hours → 💼 after finishing work tasks, → 🛋️ which I use to unwind → 🎧 or exercise."
  },
  {
    id: 20,
    category: "Hobbies & Free Time",
    question: "Do you think hobbies should be shared with family?",
    vocab: "strengthens family bonds - gắn kết tình cảm gia đình\njoyful memories - kỷ niệm vui vẻ\nshared cooking - cùng nhau nấu ăn",
    answer: "❤️ Absolutely, → 🤝 sharing activities like cooking → 👨‍👩‍👧‍👦 strengthens family bonds → 😊 and creates joyful memories."
  },

  // 5. Food & Cooking
  {
    id: 21,
    category: "Food & Cooking",
    question: "What is your favorite type of food?",
    vocab: "noodle soup - món phở / bún nước\nfresh herbs - rau sống tươi ngon\naromatic broth - nước dùng thơm phức",
    answer: "🍜 Traditional Vietnamese noodle soup, → 🍲 cooked with fresh herbs → 🥩 and savory aromatic broth → 😋 is my absolute favorite."
  },
  {
    id: 22,
    category: "Food & Cooking",
    question: "Do you enjoy cooking meals at home?",
    vocab: "healthy meals - bữa ăn lành mạnh\nfresh ingredients - nguyên liệu tươi sạch\ntherapeutic - có tính giải tỏa chữa lành",
    answer: "🍳 Yes I do, → 🥗 preparing healthy meals → 🥦 using fresh ingredients → 😌 is therapeutic for me."
  },
  {
    id: 23,
    category: "Food & Cooking",
    question: "Did you learn to cook when you were a child?",
    vocab: "family recipes - công thức gia đình\nprimary skills - kỹ năng cơ bản\nproved useful - tỏ ra rất hữu ích",
    answer: "🍳 My mother taught me → 🍲 basic family recipes → 🧑‍🍳 when I was twelve years old, → 💡 which proved very useful."
  },
  {
    id: 24,
    category: "Food & Cooking",
    question: "Do you prefer eating at home or dining out?",
    vocab: "home-cooked dishes - món ăn tự nấu tại nhà\ndining out - đi ăn tiệm ngoài hàng\nweekend treat - phần thưởng cuối tuần",
    answer: "🏡 I prefer home-cooked dishes → 🥗 for daily health, → 🍱 though dining out on weekends → 🍣 is a nice treat."
  },
  {
    id: 25,
    category: "Food & Cooking",
    question: "Is fast food popular in your country?",
    vocab: "rapid urbanization - đô thị hóa nhanh chóng\nbusy schedules - lịch trình bận rộn\nyouth culture - văn hóa giới trẻ",
    answer: "🍟 Very popular among youth, → 🍔 due to rapid urbanization → ⚡ and busy lifestyle schedules → 🏃 in major cities."
  },

  // 6. Travel & Transportation
  {
    id: 26,
    category: "Travel & Transportation",
    question: "How do you usually commute to work or school?",
    vocab: "commute by motorbike - đi lại bằng xe máy\nurban traffic - giao thông thành thị\nfast and convenient - nhanh chóng và tiện lợi",
    answer: "🛵 I travel by motorbike → 🚦 through daily urban traffic, → ⏱️ as it is fast and convenient → 🌆 in city streets."
  },
  {
    id: 27,
    category: "Travel & Transportation",
    question: "Do you enjoy travelling to new places?",
    vocab: "passionate about travel - đam mê du lịch\nscenic destinations - địa điểm thắng cảnh đẹp\nexperiencing cultures - trải nghiệm văn hóa",
    answer: "✈️ I am passionate about travel → 🏔️ exploring scenic destinations → 📸 capturing photos → 🌍 and experiencing cultures."
  },
  {
    id: 28,
    category: "Travel & Transportation",
    question: "What was the most memorable trip you have taken?",
    vocab: "ocean sunsets - hoàng hôn trên biển\nclear waters - làn nước trong xanh\ntruly magical - thực sự kỳ diệu",
    answer: "🏖️ My vacation to Danang beach → 🌅 watching ocean sunsets → 🌊 swimming in clear waters → 🤩 was truly magical."
  },
  {
    id: 29,
    category: "Travel & Transportation",
    question: "Do you prefer travelling alone or in a group?",
    vocab: "share laughter - chia sẻ tiếng cười\nshare expenses - san sẻ chi phí\nexciting journey - hành trình thú vị",
    answer: "👥 I prefer travelling with friends → 🚗 sharing laughter and expenses → 🥳 making every journey exciting → 🎉 and memorable."
  },
  {
    id: 30,
    category: "Travel & Transportation",
    question: "Will public transport improve in your city in the future?",
    vocab: "metro networks - mạng lưới tàu điện\nelectric buses - xe bus điện\nreduce carbon emissions - giảm khí thải carbon",
    answer: "🚇 Definitely yes, → 🚆 new metro networks and electric buses → 🌿 will reduce carbon emissions → 💨 and traffic congestion."
  },

  // 7. Technology & Social Media
  {
    id: 31,
    category: "Technology & Social Media",
    question: "How often do you use social media platforms?",
    vocab: "social media platforms - mạng xã hội\nnews updates - cập nhật tin tức\nstay connected - giữ liên lạc",
    answer: "📱 I check social media → ⏰ for about an hour daily → 📰 to read news updates → 💬 and stay connected."
  },
  {
    id: 32,
    category: "Technology & Social Media",
    question: "What is your favorite smartphone app?",
    vocab: "messaging apps - ứng dụng nhắn tin\nacquire skills - học thêm kỹ năng\ncommunicate efficiently - giao tiếp hiệu quả",
    answer: "💬 Messaging and learning apps → 📚 which help me acquire skills → 🤝 and communicate efficiently → ⚡ every single day."
  },
  {
    id: 33,
    category: "Technology & Social Media",
    question: "Do you think technology makes life easier or harder?",
    vocab: "vastly easier - dễ dàng hơn rất nhiều\nautomating routine chores - tự động hóa việc lặt vặt\ninstant access - truy cập tức thì",
    answer: "⚡ It makes life vastly easier → 💡 by automating routine chores → 🌐 and granting instant information access → 🎯 anywhere."
  },
  {
    id: 34,
    category: "Technology & Social Media",
    question: "Did you use computers when you were a child?",
    vocab: "desktop PCs - máy tính để bàn\nschool assignments - bài tập ở trường\neducational games - trò chơi học tập",
    answer: "💻 Yes, I started using desktop PCs → 🎓 for school assignments → 🎮 and educational games → 🧠 in primary school."
  },
  {
    id: 35,
    category: "Technology & Social Media",
    question: "Can you live for a week without your phone?",
    vocab: "challenging - đầy thử thách\nrely on for work - phụ thuộc để làm việc\nnavigation - chỉ đường bản đồ",
    answer: "📱 It would be very challenging → 💼 because I rely on it for work → 🗺️ navigation and communication, → 😬 but possible."
  },

  // 8. Sports & Fitness
  {
    id: 36,
    category: "Sports & Fitness",
    question: "Do you play any sports regularly?",
    vocab: "play badminton - chơi cầu lông\nphysically fit - thể lực săn chắc\nboost stamina - tăng cường sức bền",
    answer: "⚽ I play badminton and football → 🏋️ twice a week → 🏃 to stay physically fit → 💪 and boost stamina."
  },
  {
    id: 37,
    category: "Sports & Fitness",
    question: "What sport is most popular in your country?",
    vocab: "undoubtedly king - môn thể thao vua\nnational matches - các trận đấu quốc gia\nimmense pride - tự hào to lớn",
    answer: "⚽ Football is undoubtedly king → 🏟️ bringing millions together → 🇻🇳 during national tournament matches → ⚡ with immense pride."
  },
  {
    id: 38,
    category: "Sports & Fitness",
    question: "Did you do much exercise when you were younger?",
    vocab: "outdoor games - trò chơi ngoài trời\ncycling around - đạp xe quanh xóm\nchildhood friends - bạn thời thơ ấu",
    answer: "🏃 Yes, I was very active → ⚽ playing outdoor games daily → 🚴 cycling around the neighborhood → ☀️ with childhood friends."
  },
  {
    id: 39,
    category: "Sports & Fitness",
    question: "Do you prefer watching sports live or on TV?",
    vocab: "electric crowd atmosphere - bầu không khí cuồng nhiệt\nslow-motion replays - xem lại pha quay chậm",
    answer: "🏟️ Watching live in stadium → ⚡ offers electric crowd atmosphere, → 📺 though TV provides clear slow-motion replays."
  },
  {
    id: 40,
    category: "Sports & Fitness",
    question: "Why is physical fitness important?",
    vocab: "prevents diseases - phòng ngừa bệnh tật\nreduces mental stress - giảm căng thẳng thần kinh\nsharpens focus - minh mẫn tập trung",
    answer: "💪 Regular exercise prevents diseases → 😌 reduces mental stress → 🧠 sharpens cognitive focus → 🌅 and improves longevity."
  },

  // 9. Daily Routine & Time Management
  {
    id: 41,
    category: "Daily Routine & Time Management",
    question: "What time do you usually wake up in the morning?",
    vocab: "wake up early - thức dậy sớm\nlight stretching - giãn cơ nhẹ nhàng\nstarted refreshed - khởi đầu tỉnh táo",
    answer: "🌅 I wake up at 6:30 AM → 🏃 do light stretching → ☕ enjoy morning coffee → ☀️ to start my day refreshed."
  },
  {
    id: 42,
    category: "Daily Routine & Time Management",
    question: "What is your favorite part of the day?",
    vocab: "early evening - chiều tối muộn\nwork is finished - công việc xong xuôi\nrelax with family - nghỉ ngơi bên gia đình",
    answer: "🌆 Early evening around 7 PM → 🛋️ when work is finished → 🍳 I cook dinner and relax → 😌 with my family."
  },
  {
    id: 43,
    category: "Daily Routine & Time Management",
    question: "Do you follow a strict daily schedule?",
    vocab: "structured routine - lịch trình có thứ tự\ncalendar apps - ứng dụng lịch biểu\nmanage tasks - quản lý công việc",
    answer: "📅 I keep a structured routine → 📋 using digital calendar apps → 🎯 to manage tasks efficiently → ⏱️ without missing deadlines."
  },
  {
    id: 44,
    category: "Daily Routine & Time Management",
    question: "Is your daily routine different on weekends?",
    vocab: "sleep in - ngủ nướng\nslow morning coffee - cà phê thong thả\nrecharge energy - nạp lại năng lượng",
    answer: "🌅 Yes, on weekends I sleep in → ☕ enjoy slow morning coffee → 🌿 visit parks or meet friends → 😌 to recharge."
  },
  {
    id: 45,
    category: "Daily Routine & Time Management",
    question: "How do you manage your time effectively?",
    vocab: "prioritize urgent tasks - ưu tiên việc gấp\neliminate distractions - loại bỏ xao nhãng\nfocus on one goal - tập trung một mục tiêu",
    answer: "📋 I prioritize urgent tasks → 🎯 eliminate digital distractions → ⏱️ and focus on one goal at a time."
  },

  // 10. Weather & Seasons
  {
    id: 46,
    category: "Weather & Seasons",
    question: "What is your favorite season of the year?",
    vocab: "autumn season - mùa thu\ncool gentle breezes - làn gió mát nhẹ\npleasant sunshine - nắng thu dễ chịu",
    answer: "🍁 Autumn is my favorite → 🍂 with cool gentle breezes → ☀️ pleasant sunshine → 😌 and comfortable outdoor weather."
  },
  {
    id: 47,
    category: "Weather & Seasons",
    question: "Does the weather affect your mood?",
    vocab: "sunny days - những ngày nắng\ngloomy rainy weather - thời tiết mưa ảm đạm\nslightly sluggish - hơi uể oải",
    answer: "☀️ Sunny days boost my energy → 😔 whereas gloomy rainy weather → 🌧️ makes me feel slightly sluggish → ☕ and reflective."
  },
  {
    id: 48,
    category: "Weather & Seasons",
    question: "What do you do on rainy days?",
    vocab: "stay indoors - ở trong nhà\nsipping hot tea - nhâm nhi trà nóng\ncozy comfort - sự ấm cúng dễ chịu",
    answer: "🌧️ I prefer staying indoors → ☕ sipping hot tea → 📚 reading books or watching movies → 🛋️ in cozy comfort."
  },
  {
    id: 49,
    category: "Weather & Seasons",
    question: "Do you prefer hot or cold weather?",
    vocab: "cooler weather - thời tiết mát lạnh\ncozy jackets - áo khoác ấm áp\nwarm cocoa - ca cao nóng",
    answer: "❄️ I prefer cooler weather → 🧥 because wearing cozy jackets → ☕ and drinking warm cocoa → 😌 feels very comfortable."
  },
  {
    id: 50,
    category: "Weather & Seasons",
    question: "Has the weather changed in your region over time?",
    vocab: "global warming - nóng lên toàn cầu\nunseasonal storms - bão bất thường\nfrequently - một cách thường xuyên",
    answer: "🌍 Yes, due to global warming → ☀️ summers have become hotter → 🌧️ and unseasonal storms occur → 📈 more frequently."
  },

  // 11. Shopping & Fashion
  {
    id: 51,
    category: "Shopping & Fashion",
    question: "Do you enjoy shopping for clothes?",
    vocab: "stylish attire - trang phục thời trang\nmatches personality - hợp cá tính\ngives confidence - tạo sự tự tin",
    answer: "🛍️ Occasionally yes → 👔 selecting comfortable stylish attire → 👕 that matches my personality → 😊 gives me confidence."
  },
  {
    id: 52,
    category: "Shopping & Fashion",
    question: "Do you prefer online shopping or buying in stores?",
    vocab: "online shopping - mua sắm trực tuyến\nsaving time and effort - tiết kiệm thời gian sức lực\ntrying before buying - thử đồ trước khi mua",
    answer: "🛒 Online shopping is convenient → ⚡ saving time and effort, → 🏬 though stores allow fitting before buying."
  },
  {
    id: 53,
    category: "Shopping & Fashion",
    question: "What kind of clothes do you wear daily?",
    vocab: "casual minimalistic clothes - đồ giản dị tối giản\ncotton t-shirts - áo phông cotton\ndaily comfort - sự thoải mái hàng ngày",
    answer: "👕 Casual minimalistic clothes → 👟 like cotton T-shirts and jeans → 😌 prioritizing daily comfort → 💼 for work and study."
  },
  {
    id: 54,
    category: "Shopping & Fashion",
    question: "Did your fashion taste change as you grew older?",
    vocab: "flashy trends - xu hướng lòe loẹt\ntimeless clean clothing - trang phục lịch sự không lỗi mốt\nquality and comfort - chất lượng và sự thoải mái",
    answer: "📈 Yes, I shifted from flashy trends → 👔 to timeless, clean clothing → 🎯 emphasizing quality and comfort."
  },
  {
    id: 55,
    category: "Shopping & Fashion",
    question: "Do people in your country care much about fashion?",
    vocab: "younger generations - thế hệ trẻ\nsocial media trends - trào lưu mạng xã hội\nunique personal styles - phong cách cá nhân độc đáo",
    answer: "👗 Younger generations care a lot → 📱 influenced by social media trends → 🌟 expressing unique personal styles."
  },

  // 12. Friends & Family
  {
    id: 56,
    category: "Friends & Family",
    question: "Do you spend more time with family or friends?",
    vocab: "prioritize family - ưu tiên gia đình\nclose friends - bạn bè thân thiết\ncatching up - gặp gỡ trò chuyện",
    answer: "❤️ I prioritize family on weekends → 👨‍👩‍👧‍👦 while catching up with close friends → ☕ over weekday coffees."
  },
  {
    id: 57,
    category: "Friends & Family",
    question: "What qualities do you value most in a close friend?",
    vocab: "honesty and loyalty - chân thành và trung thành\nshare openly - chia sẻ cởi mở\nsupport through hardship - hỗ trợ lúc khó khăn",
    answer: "🤝 Honesty, empathy, and loyalty → 💡 being able to share thoughts openly → 😊 and support each other through hardship."
  },
  {
    id: 58,
    category: "Friends & Family",
    question: "Do you stay in touch with childhood friends?",
    vocab: "stay in touch - giữ liên lạc\ngroup chat - nhóm chat chung\ndecades-long bond - mối liên kết hàng thập kỷ",
    answer: "📱 Yes, we keep a group chat → 🍻 and gather during holidays → 🎉 keeping our decades-long bond strong."
  },
  {
    id: 59,
    category: "Friends & Family",
    question: "What activities do you enjoy doing with your family?",
    vocab: "family dinners - bữa cơm gia đình\nroad trips - chuyến du lịch lái xe\ntraditional holidays - ngày lễ truyền thống",
    answer: "🍲 Weekend family dinners → 🚗 road trips to peaceful countryside → 🌅 and celebrating traditional lunar holidays together."
  },
  {
    id: 60,
    category: "Friends & Family",
    question: "Is family support important when making big decisions?",
    vocab: "family advice - lời khuyên từ gia đình\nemotional security - sự an tâm cảm xúc\ndifficult choices - quyết định khó khăn",
    answer: "🛡️ Crucial indeed → 💡 family advice offers wisdom → ❤️ emotional security and confidence → 🎯 in difficult choices."
  },

  // 13. Books & Reading
  {
    id: 61,
    category: "Books & Reading",
    question: "Do you like reading books in your spare time?",
    vocab: "daily habit - thói quen hàng ngày\nexpanding knowledge - mở rộng kiến thức\nnew perspectives - góc nhìn mới",
    answer: "📚 Yes, reading is my daily habit → 🧠 expanding my knowledge → 💡 and sparking new perspectives."
  },
  {
    id: 62,
    category: "Books & Reading",
    question: "What genres of books do you prefer reading?",
    vocab: "non-fiction - sách phi hư cấu\npersonal growth - phát triển bản thân\nreal-world insights - hiểu biết thực tế",
    answer: "💡 Non-fiction books on technology → 💼 personal growth and psychology → 🎯 which provide practical real-world insights."
  },
  {
    id: 63,
    category: "Books & Reading",
    question: "Did you read many storybooks as a child?",
    vocab: "fairy tales - truyện cổ tích\nadventure novels - tiểu thuyết phiêu lưu\nignited imagination - thắp sáng trí tưởng tượng",
    answer: "📖 Yes, my parents gave me fairy tales → 🐉 and adventure novels → 🎨 which ignited my imagination early on."
  },
  {
    id: 64,
    category: "Books & Reading",
    question: "Do you prefer physical printed books or e-books?",
    vocab: "printed books - sách in giấy\nauthentic feel - cảm giác chân thực\nportability - tính di động gọn nhẹ",
    answer: "📖 Printed books feel authentic → 📄 touching real pages is relaxing, → 📱 though e-books offer portability."
  },
  {
    id: 65,
    category: "Books & Reading",
    question: "Why should young people cultivate a reading habit?",
    vocab: "critical thinking - tư duy phản biện\nvocabulary range - vốn từ vựng\nsharpens focus - rèn luyện sự tập trung",
    answer: "🧠 Reading enhances critical thinking → 💬 expands vocabulary range → 🎯 and sharpens focus in a distracted world."
  },

  // 14. Art & Museums
  {
    id: 66,
    category: "Art & Museums",
    question: "Do you like visiting art galleries or museums?",
    vocab: "art galleries - triển lãm nghệ thuật\nhistory and heritage - lịch sử và di sản\ninspires thinking - truyền cảm hứng tư duy",
    answer: "🏛️ Yes, museums offer a window → 📜 into history and heritage → 🎨 which inspires my creative thinking."
  },
  {
    id: 67,
    category: "Art & Museums",
    question: "Did you take art classes in school?",
    vocab: "drawing classes - lớp học vẽ\nwatercolor painting - vẽ màu nước\nfun and expressive - vui vẻ thể hiện cảm xúc",
    answer: "🎨 We had drawing classes in primary school → 🖍️ practicing watercolor painting → 🖼️ which was fun and expressive."
  },
  {
    id: 68,
    category: "Art & Museums",
    question: "What kind of paintings do you admire?",
    vocab: "impressionist paintings - tranh ấn tượng\nnatural light - ánh sáng tự nhiên\ninner peace - sự bình yên tâm hồn",
    answer: "🖼️ Impressionist landscape paintings → 🌅 capturing natural light and vibrant colors → 😌 that bring inner peace."
  },
  {
    id: 69,
    category: "Art & Museums",
    question: "Is art appreciation important in modern society?",
    vocab: "art appreciation - thưởng thức nghệ thuật\nenriches culture - làm phong phú văn hóa\nemotional intelligence - trí tuệ cảm xúc",
    answer: "💡 Essential indeed → 🎨 art enriches human culture → 🧠 stimulates emotional intelligence → ✨ and brings beauty."
  },
  {
    id: 70,
    category: "Art & Museums",
    question: "Have you ever bought artwork for your house?",
    vocab: "canvas painting - tranh vẽ sơn dầu\nlush green forests - rừng xanh tươi mát\ndecorate living room - trang trí phòng khách",
    answer: "🖼️ Yes, I bought a canvas painting → 🌿 depicting lush green forests → 🏠 to decorate my living room wall."
  },

  // 15. Pets & Animals
  {
    id: 71,
    category: "Pets & Animals",
    question: "Do you have any pets at home?",
    vocab: "playful cat - chú mèo tinh nghịch\nsleeping beside - ngủ bên cạnh\nendless joy - niềm vui bất tận",
    answer: "🐱 Yes, I have a playful cat → 🛋️ who loves sleeping beside me → ❤️ and brings endless joy to my house."
  },
  {
    id: 72,
    category: "Pets & Animals",
    question: "What is your favorite animal?",
    vocab: "loyal companions - người bạn trung thành\nprotective - có tính bảo vệ\naffection - tình cảm thương yêu",
    answer: "🐕 Dogs are my favorite → 🤝 because they are loyal companions → 🦮 protective and full of affection."
  },
  {
    id: 73,
    category: "Pets & Animals",
    question: "Did you have pets when you were growing up?",
    vocab: "golden retriever - chó săn lông vàng\nrunning in garden - chạy ngoài sân vườn\nunforgettable memories - kỷ niệm khó quên",
    answer: "🐕 We kept a golden retriever → 🏃 who ran with us in the garden → 🌅 creating unforgettable childhood memories."
  },
  {
    id: 74,
    category: "Pets & Animals",
    question: "Are pets popular in your city?",
    vocab: "city residents - cư dân thành phố\nadopt pets - nhận nuôi thú cưng\nbeloved family members - thành viên gia đình yêu quý",
    answer: "🐶 Very popular nowadays → 🏢 many city residents adopt cats and dogs → 🐾 as beloved family members."
  },
  {
    id: 75,
    category: "Pets & Animals",
    question: "Why do people enjoy keeping pets?",
    vocab: "provide companionship - tạo sự bạn bè đồng hành\nalleviate stress - xua tan căng thẳng\nloneliness - sự cô đơn",
    answer: "❤️ Pets provide companionship → 😌 alleviate stress and loneliness → 🏋️ and encourage active daily exercise."
  },

  // 16. Nature & Environment
  {
    id: 76,
    category: "Nature & Environment",
    question: "Do you enjoy spending time in nature?",
    vocab: "green forests - khu rừng xanh\nfresh air - không khí trong lành\nresets mind - tái tạo tâm trí",
    answer: "🌿 Yes, walking in green forests → 🌲 surrounded by tall trees and fresh air → 😌 resets my mind completely."
  },
  {
    id: 77,
    category: "Nature & Environment",
    question: "What environmental issues concern you most?",
    vocab: "plastic pollution - ô nhiễm nhựa\nair quality - chất lượng không khí\npublic health - sức khỏe cộng đồng",
    answer: "💨 Plastic pollution and air quality → 🏙️ in rapidly growing urban cities → ⚠️ threatening public health."
  },
  {
    id: 78,
    category: "Nature & Environment",
    question: "What do you do to help protect the environment?",
    vocab: "single-use plastics - nhựa dùng một lần\nreusable bags - túi dùng nhiều lần\ncycle for short trips - đi xe đạp cho quãng ngắn",
    answer: "♻️ I reduce single-use plastics → 🛍️ carry reusable cloth bags → 🚴 and cycle for short trips."
  },
  {
    id: 79,
    category: "Nature & Environment",
    question: "Are there many parks in your residential area?",
    vocab: "lake park - công viên ven hồ\njog every morning - chạy bộ mỗi sáng\ngreen surroundings - không gian xanh xung quanh",
    answer: "🌳 Yes, there is a large lake park → 🏃 where residents jog every morning → ☀️ enjoying fresh green surroundings."
  },
  {
    id: 80,
    category: "Nature & Environment",
    question: "Should schools teach environmental protection to children?",
    vocab: "green habits - thói quen sống xanh\ninstilling early - rèn luyện từ bé\neco-friendly generation - thế hệ thân thiện môi trường",
    answer: "🌱 Absolutely → 🧠 instilling green habits early → 🌍 builds a responsible eco-friendly generation."
  },

  // 17. Memory & Childhood
  {
    id: 81,
    category: "Memory & Childhood",
    question: "What is your happiest childhood memory?",
    vocab: "grandparents farm - trang trại ông bà\nrice fields - cánh đồng lúa\nflying kites - thả diều",
    answer: "🌅 Summer vacations at my grandparents' farm → 🌾 running across rice fields → 🚴 and flying kites with cousins."
  },
  {
    id: 82,
    category: "Memory & Childhood",
    question: "Do you have a good memory for names and faces?",
    vocab: "good with faces - nhớ mặt giỏi\nforget names - quên tên người\nwrite down - ghi chép lại",
    answer: "🧠 I am good with faces → 👤 though I occasionally forget names → 📝 unless I write them down."
  },
  {
    id: 83,
    category: "Memory & Childhood",
    question: "Did you enjoy your primary school days?",
    vocab: "primary school - trường tiểu học\nbreak times - giờ ra chơi\ndiscovering subjects - khám phá môn học mới",
    answer: "🎓 Thoroughly enjoyed them → ⚽ playing games during break times → 📚 and discovering new subjects with friends."
  },
  {
    id: 84,
    category: "Memory & Childhood",
    question: "How do you remember important tasks?",
    vocab: "automated reminders - nhắc nhở tự động\nto-do lists - danh sách việc cần làm\nno task missed - không bỏ sót công việc",
    answer: "📱 I set automated smartphone reminders → 📋 write digital to-do lists → 🎯 to ensure no task is missed."
  },
  {
    id: 85,
    category: "Memory & Childhood",
    question: "Is memory capacity affected by modern smartphones?",
    vocab: "outsourcing information - phụ thuộc lưu trữ bên ngoài\nreduces need to memorize - giảm nhu cầu nhớ bằng đầu\nmemory lazy - bộ nhớ trở nên lười biếng",
    answer: "🧠 Yes, outsourcing information to phones → 📱 reduces our need to memorize → ⚠️ making memory slightly lazier."
  },

  // 18. Colors & Flowers
  {
    id: 86,
    category: "Colors & Flowers",
    question: "What is your favorite color?",
    vocab: "ocean blue - màu xanh đại dương\ncalm serenity - sự bình yên tĩnh lặng\nclear thinking - tư duy sáng suốt",
    answer: "💙 Ocean blue is my favorite → 🌊 it evokes calm serenity → 😌 and promotes clear creative thinking."
  },
  {
    id: 87,
    category: "Colors & Flowers",
    question: "Does color influence your choice when buying items?",
    vocab: "neutral shades - gam màu trung tính\nnavy blue - màu xanh hải quân\nminimalist look - vẻ tối giản sang trọng",
    answer: "🎨 Definitely yes → 👔 I choose neutral shades like white and navy → 💼 for a professional minimalist look."
  },
  {
    id: 88,
    category: "Colors & Flowers",
    question: "Do you like giving or receiving flowers on special occasions?",
    vocab: "heartfelt care - sự quan tâm chân thành\nwarmth and smiles - sự ấm áp và nụ cười\nspecial occasions - dịp đặc biệt",
    answer: "💐 Yes, flowers express heartfelt care → 🌹 bringing warmth and smiles → 🎉 during birthdays and celebrations."
  },
  {
    id: 89,
    category: "Colors & Flowers",
    question: "Are flowers important in your culture?",
    vocab: "apricot blossoms - hoa mai vàng\nlunar new year - tết nguyên đán\nluck and prosperity - may mắn và thịnh vượng",
    answer: "🌸 Very important → 🌼 especially yellow apricot blossoms during Lunar New Year → 🧧 symbolizing luck and prosperity."
  },
  {
    id: 90,
    category: "Colors & Flowers",
    question: "Did you ever plant flowers in a garden?",
    vocab: "potted roses - hoa hồng trồng chậu\nwatching them bloom - ngắm hoa nở\ndaily satisfaction - sự mãn nguyện hàng ngày",
    answer: "🌱 Yes, I planted potted roses on my balcony → 🌺 watching them bloom → 😌 brings immense daily satisfaction."
  },

  // 19. Sleep & Relaxation
  {
    id: 91,
    category: "Sleep & Relaxation",
    question: "How many hours of sleep do you get each night?",
    vocab: "optimal brain function - chức năng não tối ưu\nenergetic morning - buổi sáng tràn đầy năng lượng\nsleep schedule - lịch ngủ nghỉ",
    answer: "🌙 I aim for 7 to 8 hours → 😴 which ensures optimal brain function → ⚡ and energetic morning performance."
  },
  {
    id: 92,
    category: "Sleep & Relaxation",
    question: "What do you do when you have trouble sleeping?",
    vocab: "avoid caffeine - tránh caffein\nrain sounds - tiếng mưa rơi nhẹ\ndeep breathing - hít thở sâu",
    answer: "☕ I avoid screens and caffeine → 🎧 listen to soft rain sounds → 😌 and practice deep breathing exercises."
  },
  {
    id: 93,
    category: "Sleep & Relaxation",
    question: "Do you take power naps during the day?",
    vocab: "power nap - giấc ngủ trưa ngắn\nmental alertness - sự tỉnh táo tinh thần\nwork productivity - năng suất làm việc",
    answer: "😴 A 20-minute afternoon nap → ⚡ restores mental alertness → 💼 and sharpens work productivity for the evening."
  },
  {
    id: 94,
    category: "Sleep & Relaxation",
    question: "Is good sleep essential for healthy living?",
    vocab: "repairs cellular damage - phục hồi tế bào\nimmune system - hệ miễn dịch\nstabilizes mood - ổn định tâm trạng",
    answer: "🛡️ Vital indeed → 🧠 sleep repairs cellular damage → 💪 strengthens immune system → 😌 and stabilizes mood."
  },
  {
    id: 95,
    category: "Sleep & Relaxation",
    question: "What is your ideal way to unwind after a long week?",
    vocab: "quiet weekend morning - sáng cuối tuần yên tĩnh\nspecialty coffee - cà phê thơm ngon\npeaceful comfort - sự thoải mái bình yên",
    answer: "🛋️ A quiet weekend morning → ☕ sipping specialty coffee → 📚 reading a book → 😌 in peaceful comfort."
  },

  // 20. Money & Savings
  {
    id: 96,
    category: "Money & Savings",
    question: "Is saving money important for young people?",
    vocab: "financial security - an toàn tài chính\nemergency safety funds - quỹ dự phòng khẩn cấp\nfuture life goals - mục tiêu cuộc sống tương lai",
    answer: "💰 Crucial for financial security → 🛡️ building emergency safety funds → 🎯 and funding future life goals."
  },
  {
    id: 97,
    category: "Money & Savings",
    question: "Do you prefer paying with cash or digital cards?",
    vocab: "cashless payments - thanh toán không tiền mặt\nmobile banking QR - mã QR ngân hàng\nfast and trackable - nhanh và dễ theo dõi",
    answer: "💳 Digital cashless payments → 📱 using mobile banking QR codes → ⚡ as it is fast and trackable."
  },
  {
    id: 98,
    category: "Money & Savings",
    question: "Did you save pocket money as a child?",
    vocab: "piggy bank - lợn đất tiết kiệm\nsaving small coins - để dành tiền lẻ\nfavorite books and toys - sách và đồ chơi yêu thích",
    answer: "🪙 Yes, I kept a piggy bank → 🐖 saving small coins → 🎁 to buy my favorite books and toys."
  },
  {
    id: 99,
    category: "Money & Savings",
    question: "What do you spend most of your income on?",
    vocab: "living expenses - chi phí sinh hoạt\nnutritious food - thực phẩm dinh dưỡng\nself-improvement courses - khóa học phát triển bản thân",
    answer: "🏡 Essential living expenses → 🍜 quality nutritious food → 📚 and self-improvement educational courses."
  },
  {
    id: 100,
    category: "Money & Savings",
    question: "Will paper cash be completely replaced by digital currency?",
    vocab: "digital currency - tiền kỹ thuật số / chuyển khoản\ncashless technology - công nghệ không tiền mặt\nultimate convenience - sự tiện lợi tối đa",
    answer: "💳 Highly likely in urban cities → 🌐 as cashless technology expands, → ⚡ offering ultimate convenience."
  }
];
