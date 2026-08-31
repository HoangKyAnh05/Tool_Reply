export interface IeltsPart3Item {
  id: number;
  category: string;
  question: string;
  vocab: string;
  answer: string;
}

export const ieltsPart3Bank: IeltsPart3Item[] = [
  // 1. Technology & Automation Impact
  {
    id: 1,
    category: "Technology & Automation Impact",
    question: "How will artificial intelligence reshape the job market in the next decade?",
    vocab: "routine task automation - tự động hóa tác vụ lặp lại\nupskill workforce - nâng cao tay nghề người lao động\ncreative and analytical roles - vai trò phân tích và sáng tạo\neconomic paradigm - mô hình kinh tế mới",
    answer: `🤖 In my perspective, artificial intelligence will fundamentally reshape the global employment landscape over the coming decade.
⚙️ Routine manual and clerical duties will inevitably be automated, displacing repetitive roles across various traditional sectors.
📈 However, this disruptive shift simultaneously creates unprecedented demand for high-value roles in algorithmic oversight and data ethics.
🧠 Consequently, workers must proactively upskill to specialize in uniquely human faculties, such as creative problem-solving and emotional leadership.
🌍 Ultimately, those who successfully harness AI tools will thrive in this newly evolving economic paradigm.`
  },
  {
    id: 2,
    category: "Technology & Automation Impact",
    question: "Do you believe children are becoming overly dependent on electronic devices?",
    vocab: "excessive screen time - thời gian nhìn màn hình quá mức\nsedentary lifestyle - lối sống thụ động ít vận động\ndiminished attention span - khả năng tập trung bị suy giảm",
    answer: "📱 Yes, excessive screen dependency has diminished attention spans → 📉 and encouraged sedentary indoor habits among youth. → ⚽ Parents and educators should enforce balanced screen-time limits → 🌿 and encourage outdoor social activities to foster holistic physical and cognitive development."
  },
  {
    id: 3,
    category: "Technology & Automation Impact",
    question: "What ethical dilemmas are associated with facial recognition technology in public spaces?",
    vocab: "mass surveillance - giám sát đại chúng\ninfringement on personal privacy - xâm phạm quyền riêng tư cá nhân\nalgorithmic bias - thiên kiến thuật toán",
    answer: "👁️ While facial recognition enhances public security and crime tracking, → 🛡️ it poses severe threats of mass surveillance and privacy infringement. → ⚖️ Robust regulatory frameworks are essential to prevent algorithmic bias → 📜 and ensure personal biometric data is never exploited without consent."
  },
  {
    id: 4,
    category: "Technology & Automation Impact",
    question: "How has social media transformed the way humans maintain relationships?",
    vocab: "hyper-connected world - thế giới siêu kết nối\nsuperficial interactions - tương tác bề nổi\nquality face-to-face connection - gắn kết trực tiếp chất lượng",
    answer: "🌐 Social media enables effortless global connectivity across distances, → 💬 yet it frequently replaces deep personal conversations with superficial digital likes. → 🤝 While convenient for staying in touch, → ❤️ nothing can truly substitute the emotional depth of face-to-face interaction."
  },
  {
    id: 5,
    category: "Technology & Automation Impact",
    question: "Is technology widening or narrowing the gap between developed and developing nations?",
    vocab: "digital divide - hố ngăn cách kỹ thuật số\nleapfrog traditional infrastructure - nhảy vọt hạ tầng truyền thống\nequitable internet access - tiếp cận internet bình đẳng",
    answer: "📊 It is a double-edged sword: wealthy nations lead AI innovation, → 💰 potentially widening wealth divides, → ⚡ yet mobile internet allows developing regions to leapfrog banking and education bottlenecks. → 🌍 Universal broadband access is vital to ensure equitable global empowerment."
  },

  // 2. Education & Modern Learning
  {
    id: 6,
    category: "Education & Modern Learning",
    question: "Should universities focus more on theoretical knowledge or practical vocational skills?",
    vocab: "pragmatic employability - khả năng tìm việc thực tế\ntheoretical foundations - nền tảng lý thuyết\nhybrid pedagogical model - mô hình sư phạm kết hợp",
    answer: "🎓 Higher education must strike a harmonious balance between the two: → 📚 deep theoretical understanding builds foundational critical thinking, → 💼 while hands-on internships and industry projects ensure graduate employability. → 💡 A hybrid model best prepares students for dynamic career demands."
  },
  {
    id: 7,
    category: "Education & Modern Learning",
    question: "Can online learning completely replace traditional brick-and-mortar schools?",
    vocab: "self-paced digital learning - học tập số tự định hướng\nsocial-emotional skills - kỹ năng cảm xúc xã hội\npeer collaboration - hợp tác bạn cùng lứa",
    answer: "💻 Online platforms provide unprecedented flexibility and access to world-class resources, → 🏫 yet traditional classrooms remain irreplaceable for cultivating social-emotional skills, empathy, → 🤝 and spontaneous peer collaboration under direct teacher mentorship."
  },
  {
    id: 8,
    category: "Education & Modern Learning",
    question: "How important is it for school curricula to teach financial literacy to teenagers?",
    vocab: "budgeting and investing - lập ngân sách và đầu tư\navoid predatory debt - tránh nợ nần độc hại\nfinancial autonomy - tự chủ tài chính",
    answer: "💰 Teaching practical financial literacy is utterly critical: → 📉 many young adults fall into consumer debt due to lack of money management skills. → 📈 Understanding compound interest, budgeting, and ethical investing → 🛡️ equips teenagers for lifelong financial independence and stability."
  },
  {
    id: 9,
    category: "Education & Modern Learning",
    question: "Do standardized examinations accurately evaluate a student's true potential?",
    vocab: "rote memorization - học vẹt ghi nhớ máy móc\nholistic assessment - đánh giá toàn diện\ncreative problem-solving - giải quyết vấn đề sáng tạo",
    answer: "📝 Standardized tests measure test-taking endurance and rote memorization rather than real-world creativity. → 🎨 Modern education should incorporate holistic assessments such as portfolio presentations, → 🧠 research projects, and teamwork evaluations to reflect multifaceted student talents."
  },
  {
    id: 10,
    category: "Education & Modern Learning",
    question: "Why should governments invest heavily in early childhood education?",
    vocab: "neuroplasticity - sự linh hoạt của não bộ\nintergenerational social mobility - thăng tiến xã hội qua các thế hệ\nhigh economic return - tỷ suất hoàn vốn kinh tế cao",
    answer: "🌱 Early childhood is the peak window of brain neuroplasticity. → 🧠 Quality early education narrows social inequality, nurtures emotional resilience, → 📈 and delivers the highest societal return on investment by reducing future healthcare and criminal costs."
  },

  // 3. Environment & Climate Policies
  {
    id: 11,
    category: "Environment & Climate Policies",
    question: "Who bears greater responsibility for climate change: individuals or large corporations?",
    vocab: "corporate carbon emissions - phát thải carbon của doanh nghiệp\nsustainable consumer choices - lựa chọn tiêu dùng bền vững\nregulatory enforcement - thực thi pháp lý nghiêm ngặt",
    answer: "🏭 While individuals should adopt eco-friendly consumer habits, → 🌍 the vast majority of greenhouse emissions originate from energy and manufacturing conglomerates. → 📜 Governments must mandate carbon taxes and strict renewable mandates to drive large-scale systemic transition."
  },
  {
    id: 12,
    category: "Environment & Climate Policies",
    question: "What are the most effective economic incentives to encourage renewable energy adoption?",
    vocab: "subsidies and feed-in tariffs - trợ cấp và giá mua điện ưu đãi\ncarbon pricing mechanisms - cơ chế định giá carbon\ngrid modernization - hiện đại hóa lưới điện",
    answer: "☀️ Government subsidies for solar installation, feed-in tariffs, and tax rebates on electric vehicles → ⚡ make clean tech financially compelling for consumers and businesses alike. → 💰 Taxing fossil fuels creates a powerful market incentive to shift capital toward green alternatives."
  },
  {
    id: 13,
    category: "Environment & Climate Policies",
    question: "How can cities effectively tackle the escalating crisis of single-use plastic waste?",
    vocab: "circular economy - kinh tế tuần hoàn\nban non-biodegradable plastics - cấm nhựa không phân hủy\nextended producer responsibility - trách nhiệm mở rộng của nhà sản xuất",
    answer: "♻️ Municipalities should enact outright bans on single-use plastic bags and straws, → 🛍️ promote biodegradable packaging alternatives, → 🏭 and enforce Extended Producer Responsibility laws requiring manufacturers to fund recycling infrastructure."
  },
  {
    id: 14,
    category: "Environment & Climate Policies",
    question: "Why do some nations struggle to transition away from fossil fuel dependency?",
    vocab: "entrenched energy infrastructure - hạ tầng năng lượng bám rễ sâu\neconomic reliance on coal - phụ thuộc kinh tế vào than đá\ncapital expenditure - chi phí đầu tư ban đầu lớn",
    answer: "⚡ Developing countries face colossal capital costs to overhaul legacy power grids, → 🏭 and millions of local jobs depend on coal and petroleum sectors. → 🤝 International climate financing and technology transfer are crucial to enable a just and affordable energy transition."
  },
  {
    id: 15,
    category: "Environment & Climate Policies",
    question: "Is ecotourism genuinely sustainable or does it harm pristine natural habitats?",
    vocab: "overtourism pressure - áp lực quá tải du lịch\nconservation funding - quỹ bảo tồn thiên nhiên\nstrict visitor quotas - hạn ngạch du khách nghiêm ngặt",
    answer: "🌿 Ecotourism generates vital revenue for wildlife conservation and indigenous communities, → ⚠️ yet uncontrolled tourist influx risks trampling fragile ecosystems. → 🧭 Strict visitor quotas and leave-no-trace regulations are paramount to safeguard biodiversity."
  },

  // 4. Globalization & Cultural Identity
  {
    id: 16,
    category: "Globalization & Cultural Identity",
    question: "Is cultural homogenization threatening traditional heritage in developing countries?",
    vocab: "cultural homogenization - sự đồng nhất hóa văn hóa\nwestern consumerism - lối sống tiêu dùng phương tây\npreserve cultural distinctiveness - gìn giữ bản sắc văn hóa",
    answer: "🌍 The influx of global media and fast fashion risks diluting indigenous customs and dialects among youth. → 📜 Nations must actively digitize heritage, support traditional crafts, → 🎨 and celebrate local festivals to preserve cultural distinctiveness amidst globalization."
  },
  {
    id: 17,
    category: "Globalization & Cultural Identity",
    question: "What are the primary advantages of living in a multicultural society?",
    vocab: "cultural tapestry - bức tranh đa văn hóa\ntolerance and empathy - sự bao dung và thấu hiểu\ncross-cultural innovation - đổi mới xuyên văn hóa",
    answer: "🤝 Multicultural societies foster open-mindedness, mutual empathy, and rich culinary and artistic exchanges. → 💡 Exposure to diverse perspectives dismantles stereotypes → 🚀 and sparks vibrant innovation in business and academic research."
  },
  {
    id: 18,
    category: "Globalization & Cultural Identity",
    question: "How does learning a foreign language influence a person's cognitive worldview?",
    vocab: "linguistic relativity - thuyết tương đối ngôn ngữ\nnuanced thinking - tư duy đa chiều tinh tế\ncultural bridge - cầu nối văn hóa",
    answer: "💬 Language shapes how we categorize and interpret reality. → 🧠 Mastering a foreign language builds cognitive flexibility, deepens empathy for other cultures, → 🌐 and allows individuals to serve as bridges in our interconnected global community."
  },
  {
    id: 19,
    category: "Globalization & Cultural Identity",
    question: "Should governments fund the preservation of endangered indigenous languages?",
    vocab: "intangible linguistic heritage - di sản ngôn ngữ phi vật thể\nancestral knowledge - tri thức của tổ tiên\nlinguistic archive - kho lưu trữ ngôn ngữ",
    answer: "📜 Every language encapsulates unique ancestral botanical knowledge, oral philosophies, and worldviews. → 🏛️ Government-funded linguistic documentation and bilingual schooling ensure that irreplaceable human wisdom is not lost to history."
  },
  {
    id: 20,
    category: "Globalization & Cultural Identity",
    question: "How does global trade impact local traditional artisans and craft villages?",
    vocab: "mass-produced cheap goods - hàng hóa giá rẻ sản xuất hàng loạt\nartisanal niche market - thị trường ngách thủ công cao cấp\ne-commerce export - xuất khẩu qua thương mại điện tử",
    answer: "🏺 While cheap mass-produced goods threaten traditional crafts, → 🌐 global e-commerce also enables master artisans to reach international collectors who appreciate bespoke handmade quality, → 🌟 revitalizing ancient craft villages."
  },

  // 5. Media, News & Social Networks
  {
    id: 21,
    category: "Media, News & Social Networks",
    question: "How can citizens discern reliable news from online misinformation and fake news?",
    vocab: "media literacy - năng lực thẩm định truyền thông\ncross-verify sources - kiểm chứng chéo nguồn tin\nfact-checking organizations - tổ chức kiểm chứng sự thật",
    answer: "📰 Readers must cultivate rigorous media literacy: checking publisher credibility, cross-verifying facts across reputable news agencies, → 🔍 and being skeptical of sensational clickbait headlines designed to evoke emotional outrage."
  },
  {
    id: 22,
    category: "Media, News & Social Networks",
    question: "Do news organizations have an ethical responsibility to remain politically neutral?",
    vocab: "journalistic integrity - sự liêm chính của báo chí\nunbiased objective reporting - đưa tin khách quan không thiên vị\npreserve democratic trust - bảo vệ niềm tin dân chủ",
    answer: "⚖️ Journalistic integrity is the pillar of an informed democracy. → 📜 News outlets should present verified facts and balanced viewpoints objectively, → 💡 allowing citizens to draw their own informed conclusions free from partisan spin."
  },
  {
    id: 23,
    category: "Media, News & Social Networks",
    question: "What psychological impacts do social media influencer lifestyles have on teenagers?",
    vocab: "unrealistic beauty standards - tiêu chuẩn sắc đẹp phi thực tế\nsocial comparison anxiety - áp lực so sánh xã hội\nFOMO (Fear of Missing Out) - hội chứng sợ bỏ lỡ",
    answer: "📱 Curated glamorous influencer feeds can foster feelings of inadequacy, body image anxiety, and materialism among young followers. → 🧠 Education should emphasize that online feeds are staged highlights rather than realistic everyday life."
  },
  {
    id: 24,
    category: "Media, News & Social Networks",
    question: "Should algorithms that promote sensational content be legally regulated?",
    vocab: "algorithmic transparency - sự minh bạch của thuật toán\nengagement-driven algorithms - thuật toán câu view giữ chân người dùng\nmitigate societal polarization - giảm thiểu sự chia rẽ xã hội",
    answer: "⚙️ Algorithms engineered to amplify outrage and extremism for advertising revenue damage public discourse. → 📜 Governments should mandate algorithmic transparency audits and hold tech platforms accountable for amplifying harmful disinformation."
  },
  {
    id: 25,
    category: "Media, News & Social Networks",
    question: "Will print newspapers and magazines become completely obsolete in the near future?",
    vocab: "digital journalism - báo chí số\nniche tactile appeal - sức hút xúc giác đặc biệt\nslow investigative journalism - báo chí điều tra chuyên sâu",
    answer: "📱 Daily print circulation will continue declining in favor of instant digital media, → 📰 yet premium print magazines will survive as tactile collector items for deep essays, art, and long-form investigative journalism."
  },

  // 6. Health, Medicine & Lifestyle
  {
    id: 26,
    category: "Health, Medicine & Lifestyle",
    question: "Why are sedentary lifestyle diseases like diabetes and obesity rising globally?",
    vocab: "ultra-processed food - thực phẩm siêu chế biến\nphysical inactivity - thiếu hoạt động thể chất\npreventative healthcare - y tế dự phòng",
    answer: "🍟 The combination of desk-bound office work, excessive screen time, and high consumption of sugar-laden ultra-processed food has fueled chronic lifestyle diseases. → 🥗 Prioritizing daily movement and whole-food nutrition is essential to reverse this epidemic."
  },
  {
    id: 27,
    category: "Health, Medicine & Lifestyle",
    question: "Should governments tax sugary drinks and fast food to encourage healthier eating?",
    vocab: "sugar tax - thuế đồ uống có đường\ndiscourage unhealthy consumption - giảm tiêu thụ thực phẩm có hại\nsubsidize fresh produce - trợ giá nông sản tươi sạch",
    answer: "🥤 Yes, sugar taxes have proven effective in reducing soft drink sales across many countries. → 💰 Revenues collected should be reinvested into school nutrition programs and subsidizing fresh organic vegetables for low-income households."
  },
  {
    id: 28,
    category: "Health, Medicine & Lifestyle",
    question: "How important is mental health support in high-pressure corporate environments?",
    vocab: "workplace burnout - kiệt sức vì công việc\ndestigmatize mental health - xóa bỏ định kiến về sức khỏe tâm thần\nemployee wellness programs - chương trình chăm sóc sức khỏe nhân viên",
    answer: "🏢 Workplace burnout severely reduces economic productivity and employee well-being. → 🧘 Companies must destigmatize psychological counseling, enforce reasonable working hours, → 🌿 and offer wellness days to sustain long-term creativity."
  },
  {
    id: 29,
    category: "Health, Medicine & Lifestyle",
    question: "What role should preventative healthcare play compared to curative treatments?",
    vocab: "preventative screening - tầm soát bệnh định kỳ\nreduce healthcare burden - giảm tải gánh nặng y tế\nhealthy longevity - sống thọ và khỏe mạnh",
    answer: "🩺 Preventative checkups, routine vaccinations, and lifestyle education identify health risks before they turn into costly chronic diseases, → 🏥 drastically easing burdens on hospital infrastructure and improving longevity."
  },
  {
    id: 30,
    category: "Health, Medicine & Lifestyle",
    question: "How will telemedicine and remote diagnostics reshape medical access for rural populations?",
    vocab: "telemedicine consultations - khám bệnh từ xa qua video\nremote patient monitoring - theo dõi bệnh nhân từ xa\nequitable healthcare access - tiếp cận y tế bình đẳng",
    answer: "📡 Telemedicine connects patients in remote rural areas with top specialist doctors via video calls and digital sensors, → 🏥 saving hours of travel and ensuring timely diagnostic care for vulnerable communities."
  },

  // 7. Economics, Consumerism & Money
  {
    id: 31,
    category: "Economics, Consumerism & Money",
    question: "Does aggressive advertising drive unhealthy consumerism in modern society?",
    vocab: "manufactured desire - tạo ra nhu cầu ảo\nhyper-consumerism - chủ nghĩa siêu tiêu dùng\nconscious minimalism - lối sống tối giản có ý thức",
    answer: "🛍️ Relentless targeted advertisements persuade people to buy products they do not need with money they do not have. → 💡 Embracing conscious minimalism helps individuals prioritize experiences and savings over material accumulation."
  },
  {
    id: 32,
    category: "Economics, Consumerism & Money",
    question: "What are the pros and cons of moving toward a completely cashless society?",
    vocab: "frictionless digital transactions - giao dịch số không ma sát\ncybersecurity vulnerability - lỗ hổng an ninh mạng\nfinancial inclusion - hòa nhập tài chính",
    answer: "💳 Digital payments eliminate physical theft and streamline commerce, → ⚡ yet complete cashless dependence leaves populations vulnerable to network blackouts, cyber hacking, → ⚠️ and marginalizes elderly citizens unfamiliar with digital banking."
  },
  {
    id: 33,
    category: "Economics, Consumerism & Money",
    question: "How does income inequality affect social cohesion and economic stability?",
    vocab: "wealth disparity - khoảng cách giàu nghèo\nsocial mobility stagnation - sự đình trệ cơ hội thăng tiến\nprogressive taxation - thuế lũy tiến",
    answer: "📊 Severe wealth concentration erodes trust in democratic institutions and stalls social mobility. → ⚖️ Progressive taxation, affordable public housing, and quality public education are vital to ensure a stable middle class."
  },
  {
    id: 34,
    category: "Economics, Consumerism & Money",
    question: "Should teenagers be encouraged to work part-time jobs while attending high school?",
    vocab: "time management discipline - kỷ luật quản lý thời gian\nvalue of hard-earned money - trân trọng đồng tiền do sức lao động làm ra\nacademic balance - cân bằng học tập",
    answer: "💼 Moderate part-time work teaches teenagers the value of earned money, customer communication, and self-reliance, → 📚 provided it does not compromise their sleep or core academic commitments."
  },
  {
    id: 35,
    category: "Economics, Consumerism & Money",
    question: "What measures can governments take to curb rampant housing price inflation in major cities?",
    vocab: "affordable social housing - nhà ở xã hội giá rẻ\ncurb real estate speculation - kiềm chế đầu cơ bất động sản\nzoning reform - cải cách quy hoạch đô thị",
    answer: "🏙️ Governments must build municipal social housing, impose higher property taxes on speculative vacant homes, → 🚇 and invest in rapid transit to make suburban living attractive and affordable for young families."
  },

  // 8. Urbanization & Smart Cities
  {
    id: 36,
    category: "Urbanization & Smart Cities",
    question: "What are the biggest challenges faced by rapidly expanding megacities?",
    vocab: "traffic congestion - tắc nghẽn giao thông\nair quality degradation - suy giảm chất lượng không khí\noverburdened infrastructure - hạ tầng quá tải",
    answer: "🌆 Unchecked urban migration strains sanitation systems, causes suffocating traffic jams, and escalates housing shortages. → 🏗️ Master urban planning with satellite towns and public transit is urgent to prevent slum proliferation."
  },
  {
    id: 37,
    category: "Urbanization & Smart Cities",
    question: "How can smart city technologies enhance the quality of urban life?",
    vocab: "IoT sensor networks - mạng lưới cảm biến vạn vật\nadaptive traffic management - điều phối giao thông thông minh\nenergy-efficient street lighting - đèn đường tiết kiệm năng lượng",
    answer: "🤖 Smart sensors optimizing traffic light timings dynamically reduce congestion, while automated water and waste management cut utility costs and carbon emissions, → 🏙️ creating safer and cleaner urban environments."
  },
  {
    id: 38,
    category: "Urbanization & Smart Cities",
    question: "Why is the preservation of green spaces crucial in high-density urban areas?",
    vocab: "urban heat island effect - hiệu ứng đảo nhiệt đô thị\npsychological sanctuary - nơi trú ẩn cho tâm hồn\nbiodiversity corridors - hành lang đa dạng sinh học",
    answer: "🌳 Urban parks mitigate the heat island effect, absorb rainwater runoff, → 😌 and provide essential green sanctuaries for citizens to exercise and decompress from relentless city stress."
  },
  {
    id: 39,
    category: "Urbanization & Smart Cities",
    question: "Will remote work lead to the decentralization of major metropolitan centers?",
    vocab: "decentralization trend - xu hướng phi tập trung hóa\nsuburban migration - di cư về vùng ven\nrevitalize regional towns - hồi sinh các đô thị vệ tinh",
    answer: "🏡 As companies embrace hybrid and remote workflows, many professionals relocate to quieter regional towns with lower costs of living, → 📈 decentralizing economic activity away from overcrowded downtown hubs."
  },
  {
    id: 40,
    category: "Urbanization & Smart Cities",
    question: "How can public transportation be redesigned to discourage private car usage?",
    vocab: "seamless multi-modal transit - giao thông đa phương thức liền mạch\nlast-mile connectivity - kết nối chặng cuối\ncongestion pricing zones - khu vực thu phí chống ùn tắc",
    answer: "🚆 Cities must build punctual, clean, and affordable metro lines paired with micro-mobility rentals for last-mile trips, → 🚗 alongside congestion toll zones that make driving private cars less convenient than taking transit."
  },

  // 9. Tourism & Sustainable Travel
  {
    id: 41,
    category: "Tourism & Sustainable Travel",
    question: "How does overtourism degrade local communities and historic sites?",
    vocab: "strain on local resources - quá tải tài nguyên địa phương\ncommercialization of culture - thương mại hóa văn hóa\ndisplacement of residents - người dân bản địa bị đẩy đi nơi khác",
    answer: "🏖️ Swarms of tourists inflate local living costs, commercialize cultural authenticity into cheap souvenirs, → ⚠️ and cause physical wear on ancient monuments. → 📜 Strict daily visitor caps and dispersion strategies are essential."
  },
  {
    id: 42,
    category: "Tourism & Sustainable Travel",
    question: "What are the benefits of community-based homestay tourism for rural villages?",
    vocab: "direct economic empowerment - trao quyền kinh tế trực tiếp\nauthentic cultural exchange - giao lưu văn hóa chân thực\nfund local infrastructure - tài trợ hạ tầng địa phương",
    answer: "🏡 Homestays channel tourism revenue directly into the hands of local farming families rather than foreign resort chains, → 🌾 incentivizing the preservation of authentic cultural traditions and natural landscapes."
  },
  {
    id: 43,
    category: "Tourism & Sustainable Travel",
    question: "Should tourists be required to pay an environmental preservation tax when visiting natural wonders?",
    vocab: "eco-tourism levy - phí bảo tồn sinh thái\nfund conservation rangers - tài trợ kiểm lâm bảo tồn\nmaintain trails and sanitation - duy trì đường mòn và vệ sinh",
    answer: "🌿 Absolutely: a dedicated ecological fee ensures that visitors directly fund waste management, reforestation, → 🛡️ and wildlife protection in the natural sites they come to admire."
  },
  {
    id: 44,
    category: "Tourism & Sustainable Travel",
    question: "How has budget airline travel democratized international exploration?",
    vocab: "low-cost aviation - hàng không giá rẻ\nbroaden cultural horizons - mở rộng chân trời văn hóa\nboost local hospitality - kích cầu du lịch khách sạn",
    answer: "✈️ Affordable airfares have made overseas travel accessible to ordinary students and families, → 🌍 dismantling geographical barriers and fostering cross-cultural understanding on a massive global scale."
  },
  {
    id: 45,
    category: "Tourism & Sustainable Travel",
    question: "What responsibilities do international tourists have toward local customs and etiquette?",
    vocab: "cultural sensitivity - sự nhạy cảm văn hóa\nrespect dress codes - tôn trọng quy định trang phục\nsupport local economy - ủng hộ kinh tế địa phương",
    answer: "🧭 Travelers must research and respect sacred dress codes, avoid disruptive behaviors at religious shrines, → 🤝 and treat local hosts with dignity and cultural humility."
  },

  // 10. Family Structures & Generations
  {
    id: 46,
    category: "Family Structures & Generations",
    question: "How have family dynamics shifted between traditional extended and modern nuclear families?",
    vocab: "nuclear family independence - sự độc lập của gia đình hạt nhân\nloss of elder childcare support - thiếu hụt sự hỗ trợ trông trẻ từ ông bà\nchanging social values - giá trị xã hội thay đổi",
    answer: "🏡 Modern families increasingly live in independent nuclear units due to urban living spaces, → 👵 gaining autonomy but losing the daily childcare support and generational wisdom provided by grandparents in traditional extended households."
  },
  {
    id: 47,
    category: "Family Structures & Generations",
    question: "Why do generational gaps in communication occur between parents and teenagers?",
    vocab: "digital native mindset - tư duy của thế hệ sinh ra trong thời đại số\nrapid cultural evolution - sự biến chuyển văn hóa nhanh chóng\nempathetic active listening - lắng nghe chủ động với lòng thấu hiểu",
    answer: "📱 Rapid technological and cultural changes create contrasting values: teenagers grow up in globalized digital spaces, → 👴 while parents rely on traditional norms. → 💬 Bridging this gap requires patient, non-judgmental dialogue from both sides."
  },
  {
    id: 48,
    category: "Family Structures & Generations",
    question: "What are the societal consequences of aging populations in developed countries?",
    vocab: "shrinking workforce - lực lượng lao động suy giảm\npension system strain - gánh nặng hệ thống hưu trí\ngeriatric healthcare demand - nhu cầu chăm sóc sức khỏe người cao tuổi",
    answer: "👴 Declining birth rates lead to shrinking labor forces and heavy fiscal pressure on pension and healthcare systems. → 📈 Governments must incentivize family growth and integrate older citizens into flexible consulting roles."
  },
  {
    id: 49,
    category: "Family Structures & Generations",
    question: "Should adult children be legally obligated to care for their elderly parents?",
    vocab: "filial piety - đạo hiếu con cái\nstate-funded eldercare - dịch vụ chăm sóc người già công cộng\nmoral duty vs legal mandate - bổn phận đạo đức so với quy định pháp luật",
    answer: "❤️ Filial care is a profound moral virtue in many cultures, → 🏥 yet the state must also provide accessible nursing homes and pensions so that elderly care does not overwhelm struggling young families."
  },
  {
    id: 50,
    category: "Family Structures & Generations",
    question: "How can parents effectively teach resilience to children in an era of instant gratification?",
    vocab: "delayed gratification - trì hoãn sự thỏa mãn tức thì\nconstructive failure - thất bại mang tính xây dựng\ngrowth mindset - tư duy phát triển không ngừng",
    answer: "🌱 Parents should allow children to experience manageable setbacks, encourage long-term hobbies requiring patience, → 🧠 and praise persistent effort rather than effortless success to foster true emotional resilience."
  },

  // 11. Art, Architecture & Design
  {
    id: 51,
    category: "Art, Architecture & Design",
    question: "Why should governments invest public funds in art galleries and public sculptures?",
    vocab: "cultural enrichment - làm giàu đời sống văn hóa\npublic civic pride - niềm tự hào công dân\ninspire creative innovation - khơi dậy đổi mới sáng tạo",
    answer: "🎨 Public art beautifies civic spaces, stimulates emotional intelligence, → 🏛️ and fosters community identity. → 💡 A society that nurtures art inspires innovative thinking across science and architecture."
  },
  {
    id: 52,
    category: "Art, Architecture & Design",
    question: "How does modern architectural design influence human mood and productivity?",
    vocab: "biophilic design - thiết kế ưa sinh học gắn với thiên nhiên\nnatural light optimization - tối ưu hóa ánh sáng tự nhiên\nergonomic layout - bố cục công thái học",
    answer: "🏢 Buildings with expansive windows, indoor foliage, and open communal layouts reduce cortisol levels, → ☀️ boost focus, and foster spontaneous collaboration compared to dreary cubicle mazes."
  },
  {
    id: 53,
    category: "Art, Architecture & Design",
    question: "Should ancient historic buildings be preserved even if they occupy prime commercial real estate?",
    vocab: "architectural heritage - di sản kiến trúc\ntangible historical memory - ký ức lịch sử hữu hình\nadaptive reuse - tái sử dụng công trình thích ứng",
    answer: "🏛️ Historic buildings are irreplaceable soul of a city that cannot be replaced by glass skyscrapers. → 💡 Through adaptive reuse—converting them into cafes, museums, or cultural centers—cities can balance preservation with economic vitality."
  },
  {
    id: 54,
    category: "Art, Architecture & Design",
    question: "Can AI-generated artworks ever possess genuine human emotional depth?",
    vocab: "algorithmic pattern synthesis - tổng hợp hoa văn thuật toán\nhuman lived experience - trải nghiệm sống chân thực của con người\nemotional vulnerability - sự yếu mềm cảm xúc",
    answer: "🤖 While AI creates stunning technical visuals by synthesizing datasets, → ❤️ it lacks human consciousness, suffering, and intentional love. → 🎨 True art is an expression of lived human vulnerability that algorithms can only simulate."
  },
  {
    id: 55,
    category: "Art, Architecture & Design",
    question: "Why is minimalist design becoming increasingly popular in contemporary interiors?",
    vocab: "declutter physical space - dọn dẹp không gian sống\nmental tranquility - sự thanh thản tâm trí\nfunctional elegance - vẻ thanh lịch tinh gọn",
    answer: "🛋️ In a chaotic world saturated with digital noise, minimalist interiors with clean lines and muted tones create a calming visual refuge, → 😌 promoting mental peace and functional simplicity."
  },

  // 12. Work, Remote Jobs & Future Careers
  {
    id: 56,
    category: "Work, Remote Jobs & Future Careers",
    question: "What are the key advantages and drawbacks of the global rise in remote work?",
    vocab: "geographic flexibility - linh hoạt về địa lý\nabsence of commute stress - không bị căng thẳng kẹt xe\nerosion of team bonding - suy giảm gắn kết đồng đội",
    answer: "💻 Remote work eliminates grueling commutes and grants schedule autonomy, → ⏱️ yet it can lead to feelings of isolation and make boundary management between work and rest difficult."
  },
  {
    id: 57,
    category: "Work, Remote Jobs & Future Careers",
    question: "Which skills will be most critical for career longevity in an automated future?",
    vocab: "emotional intelligence (EQ) - trí tuệ cảm xúc\ncomplex problem-solving - giải quyết vấn đề phức tạp\nadaptability and lifelong learning - khả năng thích ứng và tự học suốt đời",
    answer: "🧠 As AI handles routine tasks, career resilience will hinge on emotional intelligence, ethical reasoning, creative synthesis, → 🚀 and the agility to master emerging tools rapidly."
  },
  {
    id: 58,
    category: "Work, Remote Jobs & Future Careers",
    question: "Should companies adopt a four-day work week without reducing salaries?",
    vocab: "four-day work week - tuần làm việc 4 ngày\nenhanced work-life balance - nâng cao cân bằng công việc cuộc sống\nheightened employee productivity - nâng cao năng suất nhân viên",
    answer: "⏰ Global pilot studies demonstrate that a four-day work week boosts employee morale and mental health while maintaining or even increasing total output, → 📈 proving that well-rested teams work far more efficiently."
  },
  {
    id: 59,
    category: "Work, Remote Jobs & Future Careers",
    question: "How does the gig economy impact job security for young workers?",
    vocab: "freelance flexibility - sự linh hoạt tự do\nlack of social safety nets - thiếu lưới an sinh xã hội\nincome volatility - sự bấp bênh về thu nhập",
    answer: "🛵 The gig economy offers autonomy and flexible hours, → ⚠️ yet it leaves workers without health insurance, paid leave, or severance protections, requiring stronger legal safeguards."
  },
  {
    id: 60,
    category: "Work, Remote Jobs & Future Careers",
    question: "Why is emotional intelligence considered more important than IQ for modern leaders?",
    vocab: "empathetic leadership - lãnh đạo bằng sự thấu hiểu\ninspire collaborative trust - khơi dậy niềm tin hợp tác\nnavigate interpersonal conflicts - giải quyết mâu thuẫn khéo léo",
    answer: "🤝 A high IQ solves analytical problems, but high EQ motivates diverse teams, fosters psychological safety, and navigates crisis with empathy, → 🌟 which defines truly transformative leadership."
  },

  // 13. Sports, Competitions & National Pride
  {
    id: 61,
    category: "Sports, Competitions & National Pride",
    question: "How do major international sports events like the Olympics unite disparate cultures?",
    vocab: "universal athletic language - ngôn ngữ thể thao toàn cầu\nsymbolic peaceful competition - thi đấu hòa bình mang tính biểu tượng\nfoster global solidarity - thắt chặt tình đoàn kết quốc tế",
    answer: "🏅 The Olympic Games bring athletes from conflicting nations to compete with mutual respect, → 🌍 showcasing human excellence and reminding the world of our shared humanity above political divisions."
  },
  {
    id: 62,
    category: "Sports, Competitions & National Pride",
    question: "Why are elite professional athletes compensated with colossal salaries?",
    vocab: "commercial entertainment value - giá trị giải trí thương mại\nglobal broadcasting rights - bản quyền phát sóng toàn cầu\nshort career lifespan - tuổi thọ sự nghiệp thi đấu ngắn",
    answer: "⚽ Star athletes generate billions in broadcasting, ticket sales, and merchandise for franchises, → 💰 and their lucrative earnings reflect this massive entertainment market and the brief physical lifespan of their elite careers."
  },
  {
    id: 63,
    category: "Sports, Competitions & National Pride",
    question: "Should schools prioritize competitive sports or non-competitive physical fitness?",
    vocab: "inclusive participation - tham gia bình đẳng cho tất cả\nsportsmanship and teamwork - tinh thần thể thao và làm việc nhóm\nlifelong physical activity - vận động thể chất suốt đời",
    answer: "🏃 Schools should offer both: non-competitive fitness encourages all students to build healthy active habits, → ⚽ while competitive sports teach grit, teamwork, and how to handle defeat with grace."
  },
  {
    id: 64,
    category: "Sports, Competitions & National Pride",
    question: "What are the ethical concerns surrounding performance-enhancing drugs in sports?",
    vocab: "unfair competitive advantage - lợi thế cạnh tranh bất công\ncompromise athlete health - đe dọa sức khỏe vận động viên\nintegrity of the sport - tính trung thực của thể thao",
    answer: "🧪 Doping destroys the integrity of fair competition and causes irreversible organ damage to athletes. → 🚫 Rigorous testing and lifetime bans are essential to keep sports clean and ethical."
  },
  {
    id: 65,
    category: "Sports, Competitions & National Pride",
    question: "How does national sporting success boost collective morale and civic pride?",
    vocab: "collective euphoria - niềm hân hoan của cả dân tộc\nstrengthen national unity - củng cố khối đại đoàn kết\ninspire youth participation - khích lệ thế hệ trẻ rèn luyện",
    answer: "🇻🇳 When a national team triumphs on an international stage, millions of citizens celebrate together regardless of background, → ⚡ instilling profound patriotism and motivating thousands of children to take up athletics."
  },

  // 14. Youth, Leadership & Responsibility
  {
    id: 66,
    category: "Youth, Leadership & Responsibility",
    question: "How can young people actively influence environmental and social policies today?",
    vocab: "grassroots activism - hoạt động vận động từ cơ sở\nleveraging digital advocacy - tận dụng truyền thông số\ncommunity-led initiatives - sáng kiến do cộng đồng dẫn dắt",
    answer: "🌱 Youth can organize climate strikes, build digital awareness campaigns, vote for eco-conscious leaders, → 💡 and launch grassroots recycling drives to force policy makers into taking urgent climate action."
  },
  {
    id: 67,
    category: "Youth, Leadership & Responsibility",
    question: "What qualities distinguish inspiring youth leaders from traditional politicians?",
    vocab: "uncompromising idealism - lý tưởng trong sáng không thỏa hiệp\nauthentic communication - giao tiếp chân thành\npassion for systemic change - đam mê cải cách hệ thống",
    answer: "🌟 Young leaders communicate with raw authenticity on social platforms and champion bold systemic solutions for the future rather than playing short-term electoral politics."
  },
  {
    id: 68,
    category: "Youth, Leadership & Responsibility",
    question: "Why should volunteering and community service be encouraged in high schools?",
    vocab: "civic responsibility - trách nhiệm công dân\nnurture social empathy - bồi đắp lòng trắc ẩn xã hội\nbroaden real-world perspective - mở rộng thế giới quan thực tế",
    answer: "🤝 Community volunteering exposes students to diverse socioeconomic realities, developing deep empathy, humility, → 💡 and a lifelong commitment to public welfare."
  },
  {
    id: 69,
    category: "Youth, Leadership & Responsibility",
    question: "How can young entrepreneurs be supported in launching innovative social enterprises?",
    vocab: "seed funding and grants - vốn ươm mầm và tài trợ ban đầu\nincubator mentorship - cố vấn từ vườn ươm khởi nghiệp\nfavorable regulatory policies - chính sách ưu đãi pháp lý",
    answer: "🚀 Providing low-interest startup loans, university incubators, and tax relief enables young innovators to turn sustainable ideas into viable businesses that solve social problems."
  },
  {
    id: 70,
    category: "Youth, Leadership & Responsibility",
    question: "What responsibilities do young generations have toward preserving elder wisdom?",
    vocab: "intergenerational dialogue - đối thoại giữa các thế hệ\ndocument oral histories - ghi chép lịch sử truyền miệng\nreverence for ancestral heritage - lòng kính trọng di sản tiền nhân",
    answer: "👵 Youth should spend quality time listening to elders, recording their life stories, and adapting timeless values of resilience and community into modern digital life."
  },

  // 15. Space Exploration & Scientific Discovery
  {
    id: 71,
    category: "Space Exploration & Scientific Discovery",
    question: "Why should billions be invested in space exploration when pressing issues exist on Earth?",
    vocab: "spin-off technological breakthroughs - đột phá công nghệ phụ trợ\nmulti-planetary species - giống loài đa hành tinh\nexpand scientific frontiers - mở rộng chân trời khoa học",
    answer: "🌌 Space research drives spin-off innovations in satellite communications, solar panels, and water purification that benefit billions on Earth, → 🚀 while ensuring humanity's long-term survival as a cosmic species."
  },
  {
    id: 72,
    category: "Space Exploration & Scientific Discovery",
    question: "What are the ethical concerns regarding the commercial mining of asteroids and the Moon?",
    vocab: "space resource exploitation - khai thác tài nguyên vũ trụ\nouter space treaty - hiệp ước không gian ngoài vũ trụ\ncommon heritage of mankind - di sản chung của toàn nhân loại",
    answer: "🌕 Space resources should be managed under international treaties as the common heritage of humanity, → ⚖️ preventing powerful private corporations from monopolizing extraterrestrial minerals."
  },
  {
    id: 73,
    category: "Space Exploration & Scientific Discovery",
    question: "How has satellite technology transformed modern agriculture and climate tracking?",
    vocab: "precision agriculture - nông nghiệp chính xác\nearth observation satellites - vệ tinh quan sát trái đất\nearly storm warning systems - hệ thống cảnh báo bão sớm",
    answer: "🛰️ Satellites monitor soil moisture, deforestation, and extreme weather patterns with pinpoint accuracy, → 🌾 helping farmers optimize crop yields and saving lives through early disaster warnings."
  },
  {
    id: 74,
    category: "Space Exploration & Scientific Discovery",
    question: "Will human space tourism ever become accessible to ordinary citizens?",
    vocab: "reusable rocket technology - công nghệ tên lửa tái sử dụng\neconomies of scale - tính kinh tế theo quy mô\ncommercial orbital flights - chuyến bay quỹ đạo thương mại",
    answer: "🚀 Just as commercial aviation became affordable over decades, reusable rockets and private space competition will gradually lower orbital flight costs, → 🌌 making suborbital tourism accessible in the next century."
  },
  {
    id: 75,
    category: "Space Exploration & Scientific Discovery",
    question: "What profound philosophical shift occurs when humans gaze at Earth from space?",
    vocab: "overview effect - hiệu ứng toàn cảnh\nfragile blue marble - viên ngọc xanh mỏng manh\nboundaryless unity - sự thống nhất không biên giới",
    answer: "🌍 Astronauts experience the 'Overview Effect': seeing our borderless, fragile planet against the dark cosmic void dissolves political pettiness → 🕊️ and instills an urgent desire to protect our shared home."
  },

  // 16. Transportation & Infrastructure
  {
    id: 76,
    category: "Transportation & Infrastructure",
    question: "How will autonomous self-driving vehicles reshape urban mobility?",
    vocab: "autonomous vehicle fleets - đội xe tự lái tự hành\nreduce traffic fatalities - giảm thiểu tai nạn giao thông\nreclaim parking spaces - tái tạo bãi đỗ xe thành công viên",
    answer: "🚗 Self-driving fleets will eliminate human error accidents, optimize vehicle flow, → 🌳 and reduce the need for private car ownership, allowing vast concrete parking lots to be converted into public green parks."
  },
  {
    id: 77,
    category: "Transportation & Infrastructure",
    question: "Why are high-speed rail networks superior to domestic air travel for medium distances?",
    vocab: "carbon efficiency - tiết kiệm phát thải carbon\ncity-center to city-center connectivity - kết nối thẳng trung tâm thành phố\neffortless passenger flow - luồng hành khách thuận tiện",
    answer: "🚆 High-speed trains emit a fraction of airline carbon, connect downtown city centers directly without airport security delays, → ⚡ and offer comfortable, reliable travel for distances under 800 kilometers."
  },
  {
    id: 78,
    category: "Transportation & Infrastructure",
    question: "How can cities redesign streets to prioritize pedestrians and cyclists over cars?",
    vocab: "pedestrianized zones - phố đi bộ\nprotected bike lanes - làn đường xe đạp riêng biệt\n15-minute city concept - mô hình đô thị 15 phút",
    answer: "🚴 Implementing dedicated protected cycling lanes, widening sidewalks, and creating car-free pedestrian zones → 🏙️ encourages active transport and fosters vibrant street culture."
  },
  {
    id: 79,
    category: "Transportation & Infrastructure",
    question: "What are the environmental trade-offs of electric vehicle battery production?",
    vocab: "lithium mining impact - tác động khai thác lithium\nbattery recycling closed-loop - tái chế pin vòng lặp khép kín\nlifecycle emissions reduction - giảm phát thải toàn vòng đời",
    answer: "🔋 While battery manufacturing involves intensive mineral mining, → 🌿 over its complete lifespan an electric vehicle powered by green grids produces far fewer emissions than combustion engines, especially with closed-loop recycling."
  },
  {
    id: 80,
    category: "Transportation & Infrastructure",
    question: "Why is investment in public infrastructure the strongest engine of national economic growth?",
    vocab: "multiplier effect - hiệu ứng cấp số nhân kinh tế\nlogistics efficiency - hiệu quả chuỗi cung ứng\nattract foreign direct investment - thu hút vốn đầu tư nước ngoài",
    answer: "🏗️ Modern highways, deep-sea ports, and clean power grids lower transportation costs for businesses, create thousands of jobs, → 📈 and attract foreign investment, driving long-term prosperity."
  },

  // 17. Ethics & Artificial Intelligence
  {
    id: 81,
    category: "Ethics & Artificial Intelligence",
    question: "Who should be held legally accountable when an autonomous AI system makes a fatal error?",
    vocab: "liability framework - khuôn khổ trách nhiệm pháp lý\nsoftware developer negligence - sự cẩu thả của nhà phát triển phần mềm\nalgorithmic accountability - trách nhiệm giải trình thuật toán",
    answer: "⚖️ Legal liability must be shared between software developers, manufacturers, and operating entities through strict safety warranties and insurance pools, → 📜 ensuring victims receive immediate compensation."
  },
  {
    id: 82,
    category: "Ethics & Artificial Intelligence",
    question: "How can AI developers mitigate deep-seated societal biases in training datasets?",
    vocab: "algorithmic audit - kiểm toán thuật toán độc lập\ndiverse training datasets - tập dữ liệu huấn luyện đa dạng\nfairness benchmarks - tiêu chuẩn công bằng",
    answer: "🔍 Teams must curate diverse and representative training data, employ third-party ethical audit teams, → ⚖️ and establish algorithmic fairness benchmarks to prevent the amplification of racial or gender biases."
  },
  {
    id: 83,
    category: "Ethics & Artificial Intelligence",
    question: "Should autonomous lethal weapons systems be banned under international law?",
    vocab: "autonomous weapon systems - hệ thống vũ khí tự động\nprohibition treaty - hiệp ước cấm toàn cầu\nhuman moral oversight - sự kiểm soát đạo đức của con người",
    answer: "🛑 Delegating life-and-death decisions to algorithms without human empathy is fundamentally immoral. → 📜 The UN should enact a binding international ban on autonomous lethal weapons to prevent catastrophic automated warfare."
  },
  {
    id: 84,
    category: "Ethics & Artificial Intelligence",
    question: "How can society protect intellectual property rights in the era of generative AI?",
    vocab: "generative AI training - huấn luyện AI tạo sinh\nfair compensation for creators - đền bù công bằng cho tác giả\ncopyright licensing framework - khuôn khổ cấp phép bản quyền",
    answer: "🎨 AI corporations must transparently credit and compensate human artists and authors whose copyrighted works are utilized for model training through statutory licensing frameworks."
  },
  {
    id: 85,
    category: "Ethics & Artificial Intelligence",
    question: "Could the pursuit of Artificial General Intelligence pose an existential threat to humanity?",
    vocab: "existential risk - rủi ro hiện sinh\nAI alignment research - nghiên cứu đồng chuẩn mục tiêu AI\nfail-safe containment - cơ chế kiểm soát an toàn tuyệt đối",
    answer: "⚠️ If an superintelligent AI develops goals misaligned with human survival, the consequences could be irreversible. → 🔬 Massive global research into AI safety and alignment is non-negotiable to ensure systems remain beneficial."
  },

  // 18. Psychology & Human Happiness
  {
    id: 86,
    category: "Psychology & Human Happiness",
    question: "Does financial wealth directly correlate with long-term human happiness?",
    vocab: "diminishing marginal utility - quy luật lợi ích cận biên giảm dần\nhedonic treadmill - vòng xoáy thích nghi khoái lạc\ndeep interpersonal bonds - mối gắn kết tình cảm sâu sắc",
    answer: "💰 Wealth increases happiness by eliminating poverty and providing security, → 🛋️ but beyond a comfortable threshold, fulfillment stems from meaningful relationships, purposeful work, and gratitude."
  },
  {
    id: 87,
    category: "Psychology & Human Happiness",
    question: "How does the practice of gratitude enhance emotional and physical health?",
    vocab: "neurochemical boost - gia tăng chất dẫn truyền thần kinh\nshift psychological focus - chuyển hóa tâm điểm suy nghĩ\nlower stress hormone levels - giảm nồng độ hormone căng thẳng",
    answer: "🙏 Regularly reflecting on positive aspects releases dopamine and serotonin while lowering cortisol levels, → 🧠 rewiring the brain away from anxiety toward sustained optimism and resilience."
  },
  {
    id: 88,
    category: "Psychology & Human Happiness",
    question: "Why is the epidemic of loneliness spreading in hyper-connected modern societies?",
    vocab: "digital superficiality - sự hời hợt của thế giới số\natrophy of community spaces - sự suy tàn của không gian cộng đồng\nneed for vulnerable intimacy - nhu cầu gắn kết chân thành",
    answer: "👥 People substitute meaningful communal gatherings with passive social media scrolling, → 📱 creating an illusion of connection that leaves the fundamental human need for authentic intimacy unfulfilled."
  },
  {
    id: 89,
    category: "Psychology & Human Happiness",
    question: "How does spending time in natural wilderness restore cognitive attention?",
    vocab: "Attention Restoration Theory - thuyết phục hồi sự chú ý\nsoft fascination - sự cuốn hút êm dịu\nreduce mental fatigue - xua tan mệt mỏi tinh thần",
    answer: "🌲 Nature offers 'soft fascination'—gentle rustling leaves and flowing rivers—which allows fatigued voluntary attention networks to rest and recharge, → 😌 boosting creative clarity."
  },
  {
    id: 90,
    category: "Psychology & Human Happiness",
    question: "What role does purpose or 'Ikigai' play in longevity and life satisfaction?",
    vocab: "meaningful life purpose - mục đích sống ý nghĩa\nIkigai philosophy - triết lý lẽ sống Ikigai\nsustained vitality in old age - duy trì sức sống dẻo dai tuổi già",
    answer: "🎯 Having a clear reason to wake up each morning—combining passion, skill, and contribution to others—strengthens immune function and provides profound mental resilience into old age."
  },

  // 19. Government, Law & Social Welfare
  {
    id: 91,
    category: "Government, Law & Social Welfare",
    question: "Should universal healthcare be considered a fundamental human right funded by taxation?",
    vocab: "universal healthcare access - tiếp cận y tế toàn dân\ncollective risk pooling - chia sẻ rủi ro tập thể\nequitable public health - y tế công cộng công bằng",
    answer: "🏥 Yes: no citizen should face bankruptcy or death due to treatable illnesses. → 🛡️ State-funded healthcare funded through progressive taxation ensures a healthier, more productive, and empathetic society."
  },
  {
    id: 92,
    category: "Government, Law & Social Welfare",
    question: "What are the arguments for and against Universal Basic Income in automated economies?",
    vocab: "Universal Basic Income (UBI) - thu nhập cơ bản phổ quát\npoverty safety net - lưới an sinh xóa đói giảm nghèo\nfiscal sustainability - tính bền vững về ngân sách",
    answer: "💵 UBI guarantees a dignified financial safety net as AI displaces jobs and stimulates local economies, → 📊 yet funding it requires substantial tax restructuring without disincentivizing labor participation."
  },
  {
    id: 93,
    category: "Government, Law & Social Welfare",
    question: "How can legal systems become more accessible and affordable for ordinary citizens?",
    vocab: "legal aid programs - chương trình trợ giúp pháp lý\nsimplified dispute resolution - hòa giải tranh chấp đơn giản hóa\ndigital court hearings - phiên tòa xét xử trực tuyến",
    answer: "⚖️ Governments should expand subsidized public defenders, introduce streamlined small-claims mediation, → 💻 and utilize digital court platforms to eliminate expensive bureaucratic hurdles."
  },
  {
    id: 94,
    category: "Government, Law & Social Welfare",
    question: "Why is government transparency essential for sustaining public trust and democracy?",
    vocab: "open government data - dữ liệu chính phủ mở\nanti-corruption watchdog - cơ quan giám sát chống tham nhũng\ninformed citizen participation - sự tham gia hiểu biết của công dân",
    answer: "🏛️ When public spending, legislation, and policies are transparent and open to journalistic scrutiny, → 🤝 corruption is curtailed and citizens maintain faith in democratic governance."
  },
  {
    id: 95,
    category: "Government, Law & Social Welfare",
    question: "How should modern laws adapt to regulate cryptocurrency and decentralized finance?",
    vocab: "decentralized finance (DeFi) - tài chính phi tập trung\nconsumer protection - bảo vệ người tiêu dùng\nanti-money laundering - chống rửa tiền",
    answer: "🌐 Regulators must prevent fraud, tax evasion, and money laundering while preserving blockchain innovation, → 📜 creating clear custody rules and consumer insurance mandates."
  },

  // 20. History & Preservation of Heritage
  {
    id: 96,
    category: "History & Preservation of Heritage",
    question: "Why is the rigorous study of history vital for avoiding recurring societal mistakes?",
    vocab: "historical patterns - các quy luật lịch sử\ncritical historical inquiry - nghiên cứu lịch sử có phản biện\nprevent catastrophic recurrence - ngăn chặn sai lầm tái diễn",
    answer: "📜 History illuminates how economic crises, hyper-nationalism, and authoritarianism arose in the past. → 💡 Understanding these historical catalysts equips societies to defend peace and democratic norms."
  },
  {
    id: 97,
    category: "History & Preservation of Heritage",
    question: "How can museums use virtual reality to make ancient history exciting for young generations?",
    vocab: "immersive virtual reality - thực tế ảo sống động\n3D architectural reconstruction - tái dựng kiến trúc 3D\ninteractive historical simulation - mô phỏng lịch sử tương tác",
    answer: "🥽 VR headsets allow students to walk through ancient Rome or imperial Hue Citadel as they existed centuries ago, → 🏛️ transforming abstract textbook dates into unforgettable sensory adventures."
  },
  {
    id: 98,
    category: "History & Preservation of Heritage",
    question: "Should artifacts looted during colonial periods be returned to their countries of origin?",
    vocab: "cultural repatriation - hồi hương cổ vật văn hóa\ncolonial heritage restitution - hoàn trả di sản thời thuộc địa\nrightful cultural custodians - chủ thể văn hóa đích thực",
    answer: "🏺 Yes: sacred relics and treasures looted during colonial conquests belong to the heritage of their native communities. → 🤝 Repatriating them honors historical justice and cultural dignity."
  },
  {
    id: 99,
    category: "History & Preservation of Heritage",
    question: "How can modern cities celebrate traditional folk crafts in contemporary design?",
    vocab: "indigenous craft integration - tích hợp thủ công bản địa\nsustainable artisanal materials - vật liệu thủ công bền vững\ncontemporary aesthetics - thẩm mỹ đương đại",
    answer: "🎨 Modern architects and fashion designers can integrate traditional lacquer, silk, and bamboo weaving into sleek minimalist products, → 🌟 keeping ancient craft skills economically thriving."
  },
  {
    id: 100,
    category: "History & Preservation of Heritage",
    question: "What is the ultimate role of shared cultural heritage in an increasingly globalized world?",
    vocab: "anchor of identity - mỏ neo bản sắc văn hóa\nmutual cultural reverence - sự tôn kính văn hóa lẫn nhau\nglobal mosaic of humanity - bức tranh khảm vĩ đại của nhân loại",
    answer: "🌍 Heritage serves as an anchor of collective identity in a fast-moving world. → 🌟 Honoring our distinct cultural roots while revering those of others creates a rich, peaceful global mosaic of human civilization."
  }
];
