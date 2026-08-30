import { IeltsTask1Item } from '../types/ieltsWriting';

export const ieltsWritingTask1Bank: IeltsTask1Item[] = [
// ==================== CAMBRIDGE 19 ====================
  {
    id: 1,
    title: "[Cambridge 19 - Test 1] Participants in Activities at a Melbourne Social Centre (2000-2020)",
    chartType: "line",
    category: "Community & Society",
    prompt: "The line graph below shows the number of participants for different activities at a social centre in Melbourne, Australia, between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Number of Participants",
      unit: "People",
      categories: ["2000", "2005", "2010", "2015", "2020"],
      series: [
        {
          label: "Film Club",
          color: "#3b82f6",
          data: [
            { name: "2000", value: 64 },
            { name: "2005", value: 65 },
            { name: "2010", value: 63 },
            { name: "2015", value: 65 },
            { name: "2020", value: 65 }
          ]
        },
        {
          label: "Table Tennis",
          color: "#10b981",
          data: [
            { name: "2000", value: 18 },
            { name: "2005", value: 22 },
            { name: "2010", value: 38 },
            { name: "2015", value: 46 },
            { name: "2020", value: 54 }
          ]
        },
        {
          label: "Martial Arts",
          color: "#f59e0b",
          data: [
            { name: "2000", value: 37 },
            { name: "2005", value: 35 },
            { name: "2010", value: 32 },
            { name: "2015", value: 36 },
            { name: "2020", value: 36 }
          ]
        },
        {
          label: "Amateur Dramatics",
          color: "#ef4444",
          data: [
            { name: "2000", value: 27 },
            { name: "2005", value: 22 },
            { name: "2010", value: 12 },
            { name: "2015", value: 9 },
            { name: "2020", value: 6 }
          ]
        },
        {
          label: "Musical Performances",
          color: "#8b5cf6",
          data: [
            { name: "2000", value: 0 },
            { name: "2005", value: 10 },
            { name: "2010", value: 15 },
            { name: "2015", value: 18 },
            { name: "2020", value: 19 }
          ]
        }
      ]
    },
    overview: "Overall, the film club remained by far the most consistently popular activity throughout the entire 20-year timeframe. Concurrently, table tennis and musical performances experienced notable increases, whereas amateur dramatics witnessed a sharp and continuous downturn.",
    sampleAnswerBand8: "The provided line graph illustrates the attendance figures across five recreational activities at a community centre situated in Melbourne over a two-decade period starting in 2000.\n\nOverall, the film club remained by far the most consistently popular activity throughout the entire 20-year timeframe. Concurrently, table tennis and musical performances experienced notable increases, whereas amateur dramatics witnessed a sharp and continuous downturn.\n\nFocusing on the activities with the greatest popularity, participation in the film club commenced at approximately 64 individuals in 2000 and plateaued remarkably near 65 throughout the period, with only minor oscillations. Meanwhile, table tennis engaged 18 players initially before embarking on an impressive threefold rise to peak at 54 participants by 2020, solidifying its rank as the second most favored pursuit.\n\nTurning to the remaining pursuits, martial arts fluctuated marginally within a narrow corridor between 32 and 37 attendees, finishing virtually unchanged at 36 in 2020. Conversely, amateur dramatics suffered a steep contraction from 27 participants in 2000 to a negligible low of 6 at the conclusion of the survey. Lastly, musical performances, which did not exist in 2000, was introduced in 2005 with 10 members and expanded steadily to reach 19 by 2020.",
    keyVocabulary: [
      { word: "plateaued remarkably", meaning: "duy trì mức ổn định đáng chú ý" },
      { word: "threefold rise", meaning: "sự tăng trưởng gấp 3 lần" },
      { word: "minor oscillations", meaning: "những dao động nhỏ" },
      { word: "steep contraction", meaning: "sự suy giảm mạnh" }
    ],
    wordCount: 202,
    bandScore: "8.5"
  },
  {
    id: 2,
    title: "[Cambridge 19 - Test 2] Map Comparison of Porth Harbour (2000 vs Present Day)",
    chartType: "map",
    category: "Urban Development & Infrastructure",
    prompt: "The two maps below show Porth Harbour in 2000 and how it looks today. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Dock Area & Marina",
          pastStatus: "Commercial fishing docks with cargo loading cranes",
          presentStatus: "Transformed into recreational private yacht marina with boardwalk",
          type: "commercial"
        },
        {
          name: "Waterfront Buildings",
          pastStatus: "Old disused packing warehouses and fish processing plant",
          presentStatus: "Demolished and replaced by luxury seaside hotel & boutique cafes",
          type: "commercial"
        },
        {
          name: "Southern Peninsula",
          pastStatus: "Undeveloped rocky shoreline and gravel track",
          presentStatus: "Designated public beach with lifeguard tower & modern shower blocks",
          type: "nature"
        },
        {
          name: "Transport & Parking",
          pastStatus: "Small unpaved 20-vehicle car park",
          presentStatus: "Expanded modern multi-bay car park accommodating 150 vehicles",
          type: "transport"
        },
        {
          name: "Visitor Amenities",
          pastStatus: "No public amenities or tourist facilities",
          presentStatus: "Added marina reception desk, cafe terrace, and promenade seating",
          type: "commercial"
        }
      ]
    },
    overview: "Overall, Porth Harbour has transitioned comprehensively from an industrial commercial fishing port into a contemporary maritime leisure and tourism destination, distinguished by modernized leisure facilities, upgraded hospitality accommodations, and expanded vehicular parking.",
    sampleAnswerBand8: "The maps detail the spatial redevelopment of Porth Harbour, contrasting its original layout in the year 2000 with its modern configuration today.\n\nOverall, Porth Harbour has transitioned comprehensively from an industrial commercial fishing port into a contemporary maritime leisure and tourism destination, distinguished by modernized leisure facilities, upgraded hospitality accommodations, and expanded vehicular parking.\n\nIn the year 2000, the central waterfront was dominated by operational commercial docks designated for industrial fishing vessels and cargo unloading. By the present day, this industrial infrastructure has been completely reconfigured into a private marina dedicated to leisure yachts and pleasure craft. Furthermore, the obsolete fish processing facilities and vacant warehouses bordering the northern quay have been pulled down to make room for a luxury waterfront hotel and a strip of vibrant boutique cafes.\n\nTurning to the peripheral zones, the southern shoreline, previously an untouched gravel terrain, has been upgraded into an accessible public beach accompanied by dedicated shower and changing facilities. To cater to the substantial influx of visitors, the modest 20-space unpaved car park situated near the main entrance road has undergone dramatic expansion, evolving into a paved, multi-bay facility capable of holding up to 150 vehicles.",
    keyVocabulary: [
      { word: "industrial infrastructure", meaning: "hạ tầng công nghiệp" },
      { word: "reconfigured into", meaning: "được quy hoạch, tái cấu trúc lại thành" },
      { word: "obsolete facilities", meaning: "các cơ sở vật chất lỗi thời, cũ kỹ" },
      { word: "substantial influx of visitors", meaning: "lượng lớn du khách đổ về" }
    ],
    wordCount: 198,
    bandScore: "8.5"
  },
  {
    id: 3,
    title: "[Cambridge 19 - Test 3] Industrial Production Process of Biofuel (Ethanol) from Corn",
    chartType: "process",
    category: "Science, Technology & Energy",
    prompt: "The diagram below shows how a biofuel called ethanol is produced from corn. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "Corn Harvesting & Storage",
          description: "Corn is harvested mechanically from agricultural fields and stockpiled in large storage silos.",
          icon: "🌽"
        },
        {
          stepNumber: 2,
          title: "Milling & Grinding",
          description: "Stored corn grain is fed into heavy industrial mills to be ground down into fine corn meal flour.",
          icon: "⚙️"
        },
        {
          stepNumber: 3,
          title: "Cooking with Water",
          description: "Corn flour is transferred to pressurized cooking vats where water and enzymes are introduced for 4 hours.",
          icon: "♨️"
        },
        {
          stepNumber: 4,
          title: "Fermentation Process",
          description: "The cooled mash is pumped into expansive fermentation tanks with yeast, fermenting over 48 hours.",
          icon: "🧪"
        },
        {
          stepNumber: 5,
          title: "Distillation & Separation",
          description: "Fermented liquid undergoes distillation, vaporizing and condensing into purified liquid ethanol.",
          icon: "⚗️"
        },
        {
          stepNumber: 6,
          title: "Solid Byproduct Extraction",
          description: "Solid grain residues left behind are drained and dried to produce nutrient-rich animal livestock feed.",
          icon: "🌾"
        },
        {
          stepNumber: 7,
          title: "Dehydration & Blending",
          description: "Remaining water traces are molecularly filtered to produce 99.5% pure fuel-grade bioethanol.",
          icon: "🔬"
        },
        {
          stepNumber: 8,
          title: "Distribution & Fuel Transport",
          description: "Finished ethanol is pumped into tanker trucks and dispatched to commercial fuel stations.",
          icon: "🚚"
        }
      ]
    },
    overview: "Overall, the manufacturing of bioethanol is an eight-stage linear procedure that converts raw agricultural grain into refined renewable motor fuel, involving mechanical preparation, biological fermentation, chemical distillation, and byproduct repurposing.",
    sampleAnswerBand8: "The provided flow diagram delineates the multi-stage linear procedure by which corn is chemically and mechanically converted into bioethanol fuel.\n\nOverall, the manufacturing of bioethanol is an eight-stage linear procedure that converts raw agricultural grain into refined renewable motor fuel, involving mechanical preparation, biological fermentation, chemical distillation, and byproduct repurposing.\n\nThe process initiates when cultivated corn is harvested from farmland and delivered to storage facilities. In the second stage, the whole kernels pass through industrial milling machinery where they are thoroughly pulverized into fine cornmeal. Subsequently, this grain flour is channeled into heated cooking chambers, where water and enzymes are blended in, undergoing continuous heating for approximately four hours to break down starches into fermentable sugars.\n\nIn the fourth stage, the resulting cooked mash enters massive fermentation silos, where yeast is introduced, allowing biological conversion to proceed uninterrupted over a 48-hour window. Following this, the fermented mixture is distilled: heat vaporizes the alcoholic content, separating pure liquid ethanol from solid residue. While the solid residue is dehydrated and marketed as high-protein livestock feed, the liquid ethanol undergoes final dehydration to eliminate residual moisture. In the terminal phase, the refined biofuel is pumped into commercial tanker trucks for logistical distribution to petrol filling stations.",
    keyVocabulary: [
      { word: "linear procedure", meaning: "quy trình tuần tự theo đường thẳng" },
      { word: "pulverized into fine cornmeal", meaning: "nghiền mịn thành bột ngô" },
      { word: "fermentable sugars", meaning: "các loại đường có thể lên men" },
      { word: "byproduct repurposing", meaning: "tái sử dụng phụ phẩm" }
    ],
    wordCount: 215,
    bandScore: "8.5"
  },
  {
    id: 4,
    title: "[Cambridge 19 - Test 4] Youth Dance Class Enrolment by Type in an Australian Town",
    chartType: "bar",
    category: "Culture, Arts & Recreation",
    prompt: "The bar chart below shows the number of young people attending different types of dance classes in an Australian town in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Age Group",
      yAxisTitle: "Number of Students",
      unit: "Students",
      categories: ["Ballet", "Tap", "Modern Dance", "Contemporary", "Hip-hop"],
      series: [
        {
          label: "Under 11 Years Old",
          color: "#ec4899",
          data: [
            { name: "Ballet", value: 620 },
            { name: "Tap", value: 430 },
            { name: "Modern Dance", value: 310 },
            { name: "Contemporary", value: 150 },
            { name: "Hip-hop", value: 240 }
          ]
        },
        {
          label: "11 to 16 Years Old",
          color: "#3b82f6",
          data: [
            { name: "Ballet", value: 290 },
            { name: "Tap", value: 260 },
            { name: "Modern Dance", value: 510 },
            { name: "Contemporary", value: 440 },
            { name: "Hip-hop", value: 680 }
          ]
        }
      ]
    },
    overview: "Overall, ballet and tap attracted significantly higher proportions of children aged under 11, whereas hip-hop and modern dance emerged as the dominant preferences among teenagers aged 11 to 16.",
    sampleAnswerBand8: "The bar chart delineates the volume of young students enrolled in five distinct genres of dance instruction in an Australian municipality throughout the year 2022, disaggregated across two distinct age cohorts: under 11 and 11 to 16.\n\nOverall, ballet and tap attracted significantly higher proportions of children aged under 11, whereas hip-hop and modern dance emerged as the dominant preferences among teenagers aged 11 to 16.\n\nRegarding the younger demographic, ballet was emphatically the most popular discipline, boasting an enrolment of 620 pupils, which was more than double the corresponding figure for the older bracket (290). Tap dance mirrored this generational preference, registering 430 younger attendees compared to only 260 adolescents. Conversely, contemporary dance was the least favored genre among the under-11s, engaging merely 150 children.\n\nA markedly contrasting pattern characterized the 11-16 age group. Hip-hop reigned supreme with 680 teen participants, almost triple the 240 recorded for younger dancers. Modern dance also experienced elevated popularity among older youths, drawing 510 students against 310 from the under-11 segment. Finally, contemporary dance registered nearly three times as many adolescents (440) as pre-teens.",
    keyVocabulary: [
      { word: "disaggregated across", meaning: "được phân tách theo từng nhóm" },
      { word: "reigned supreme", meaning: "chiếm ưu thế tuyệt đối" },
      { word: "generational preference", meaning: "sở thích mang tính thế hệ" },
      { word: "markedly contrasting pattern", meaning: "mô thức tương phản rõ rệt" }
    ],
    wordCount: 195,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 18 ====================
  {
    id: 5,
    title: "[Cambridge 18 - Test 1] Urban Population Growth in Four Asian Countries (1970-2040)",
    chartType: "line",
    category: "Demographics & Urbanisation",
    prompt: "The line graph below shows the percentage of the population in four Asian countries living in cities from 1970 to 2020, with projections for 2030 and 2040. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Urban Population (%)",
      unit: "%",
      categories: ["1970", "1990", "2010", "2020", "2030", "2040"],
      series: [
        {
          label: "Malaysia",
          color: "#ef4444",
          data: [
            { name: "1970", value: 30 },
            { name: "1990", value: 48 },
            { name: "2010", value: 71 },
            { name: "2020", value: 78 },
            { name: "2030", value: 82 },
            { name: "2040", value: 85 }
          ]
        },
        {
          label: "Philippines",
          color: "#3b82f6",
          data: [
            { name: "1970", value: 32 },
            { name: "1990", value: 49 },
            { name: "2010", value: 45 },
            { name: "2020", value: 47 },
            { name: "2030", value: 51 },
            { name: "2040", value: 55 }
          ]
        },
        {
          label: "Indonesia",
          color: "#10b981",
          data: [
            { name: "1970", value: 17 },
            { name: "1990", value: 31 },
            { name: "2010", value: 50 },
            { name: "2020", value: 57 },
            { name: "2030", value: 63 },
            { name: "2040", value: 68 }
          ]
        },
        {
          label: "Thailand",
          color: "#f59e0b",
          data: [
            { name: "1970", value: 20 },
            { name: "1990", value: 29 },
            { name: "2010", value: 38 },
            { name: "2020", value: 41 },
            { name: "2030", value: 46 },
            { name: "2040", value: 51 }
          ]
        }
      ]
    },
    overview: "Overall, all four Asian nations exhibited continuous upward trends in urban dwelling proportions, a pattern projected to persist through 2040. Malaysia established and maintained the steepest growth trajectory, overtaking the Philippines to become predominantly urbanized.",
    sampleAnswerBand8: "The line graph traces the proportion of city dwellers across four Southeast Asian territories between 1970 and 2020, together with prospective forecasts extending to 2040.\n\nOverall, all four Asian nations exhibited continuous upward trends in urban dwelling proportions, a pattern projected to persist through 2040. Malaysia established and maintained the steepest growth trajectory, overtaking the Philippines to become predominantly urbanized.\n\nIn 1970, the Philippines stood marginally ahead with 32% of its citizens residing in municipal areas, closely shadowed by Malaysia at 30%. However, while the Philippines experienced rapid expansion up to 1990 (49%) followed by a mild contraction and stagnation around 47% by 2020, Malaysia surged ahead aggressively. By 2010, Malaysia's urban ratio had soared to 71%, reaching 78% in 2020 and expected to peak at 85% by 2040.\n\nRegarding the remaining two nations, Indonesia commenced in 1970 with the lowest urban proportion at just 17%. Over the succeeding decades, its city demographic expanded substantially, surpassing Thailand in the late 1990s and reaching 57% in 2020, with forecasts predicting 68% by 2040. In contrast, Thailand recorded more moderate, steady increments, ascending from 20% in 1970 to 41% in 2020, and is projected to conclude as the least urbanized country at roughly 51% in 2040.",
    keyVocabulary: [
      { word: "predominantly urbanized", meaning: "chủ yếu là đô thị hóa" },
      { word: "steepest growth trajectory", meaning: "quỹ đạo tăng trưởng dốc nhất" },
      { word: "mild contraction", meaning: "sự thu hẹp, sụt giảm nhẹ" },
      { word: "moderate increments", meaning: "những bước gia tăng vừa phải" }
    ],
    wordCount: 220,
    bandScore: "8.5"
  },
  {
    id: 6,
    title: "[Cambridge 18 - Test 2] US Household Distribution by Annual Income Brackets (2007, 2011, 2015)",
    chartType: "bar",
    category: "Economics, Wealth & Income",
    prompt: "The bar chart below shows the number of households in the US by their annual income in 2007, 2011, and 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Income Bracket",
      yAxisTitle: "Number of Households (Millions)",
      unit: "Million Households",
      categories: ["Under $25k", "$25k-$49.9k", "$50k-$74.9k", "$75k-$99.9k", "$100k or more"],
      series: [
        {
          label: "2007",
          color: "#6366f1",
          data: [
            { name: "Under $25k", value: 25 },
            { name: "25k-49k", value: 27 },
            { name: "50k-74k", value: 21 },
            { name: "75k-99k", value: 14 },
            { name: "100k+", value: 29 }
          ]
        },
        {
          label: "2011",
          color: "#ec4899",
          data: [
            { name: "Under $25k", value: 28 },
            { name: "25k-49k", value: 29 },
            { name: "50k-74k", value: 21 },
            { name: "75k-99k", value: 14 },
            { name: "100k+", value: 27 }
          ]
        },
        {
          label: "2015",
          color: "#10b981",
          data: [
            { name: "Under $25k", value: 26 },
            { name: "25k-49k", value: 28 },
            { name: "50k-74k", value: 21 },
            { name: "75k-99k", value: 15 },
            { name: "100k+", value: 33 }
          ]
        }
      ]
    },
    overview: "Overall, households earning $100,000 or more constituted the largest single demographic bracket by 2015, following sustained post-recession growth. Meanwhile, the middle-income tiers maintained remarkable stability across the 8-year duration.",
    sampleAnswerBand8: "The bar chart provides an empirical breakdown of American households grouped by five annual income thresholds across three individual calendar years: 2007, 2011, and 2015.\n\nOverall, households earning $100,000 or more constituted the largest single demographic bracket by 2015, following sustained post-recession growth. Meanwhile, the middle-income tiers maintained remarkable stability across the 8-year duration.\n\nIn 2007, the top earnings cohort ($100,000 or more) represented roughly 29 million homes. During the 2011 economic downturn, this number dipped marginally to 27 million, before staging a robust resurgence to hit 33 million in 2015, establishing the highest recorded value in the entire dataset. A comparable recovery appeared in the under $25,000 category, which climbed from 25 million in 2007 to peak at 28 million in 2011, before subsiding to 26 million by 2015.\n\nIn stark contrast, the intermediate income categories demonstrated minimal volatility. The $25,000 to $49,999 tier maintained second position throughout, hovering narrowly between 27 and 29 million households. Similarly, the $50,000 to $74,999 group held completely static at 21 million across all three benchmark years, while households generating $75,000 to $99,999 comprised the smallest segment, edging up modestly from 14 to 15 million.",
    keyVocabulary: [
      { word: "empirical breakdown", meaning: "sự phân bổ dữ liệu thực nghiệm" },
      { word: "robust resurgence", meaning: "sự trỗi dậy, phục hồi mạnh mẽ" },
      { word: "minimal volatility", meaning: "sự biến động tối thiểu" },
      { word: "intermediate income categories", meaning: "các phân khúc thu nhập tầm trung" }
    ],
    wordCount: 204,
    bandScore: "8.5"
  },
  {
    id: 7,
    title: "[Cambridge 18 - Test 3] Floor Plan of a Public Library 20 Years Ago and Today",
    chartType: "map",
    category: "Public Facilities & Architecture",
    prompt: "The diagrams below show the floor plan of a public library 20 years ago and how it looks now. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Central Floor & Seating",
          pastStatus: "Row of standard reading study tables and chairs",
          presentStatus: "Replaced by comfortable modern armchairs and mobile tablet pods",
          type: "commercial"
        },
        {
          name: "Left Wing (West)",
          pastStatus: "Enquiry desk for returns and paper newspaper/periodical stands",
          presentStatus: "Converted into a vibrant public café and self-checkout RFID kiosks",
          type: "commercial"
        },
        {
          name: "Right Wing (East)",
          pastStatus: "Dedicated Children's book corner with small benches",
          presentStatus: "Expanded into multimedia storytelling zone and lecture room",
          type: "residential"
        },
        {
          name: "Back Room (North)",
          pastStatus: "Extensive physical reference books and quiet study room",
          presentStatus: "Fitted out with 20 high-speed computer terminals and digital printers",
          type: "commercial"
        },
        {
          name: "Entrance & Reception",
          pastStatus: "Manual circulation counter staffed by librarians",
          presentStatus: "Automated scan turnstiles, visitor information screen, and helpdesk",
          type: "transport"
        }
      ]
    },
    overview: "Overall, the public library has transitioned from a conventional, quiet print-book repository into an interactive digital learning hub, characterized by computerized facilities, automated checkouts, and a social café venue.",
    sampleAnswerBand8: "The floor plans outline the architectural and functional transformation of a public library over a span of two decades, contrasting its historical layout with its modern configuration.\n\nOverall, the public library has transitioned from a conventional, quiet print-book repository into an interactive digital learning hub, characterized by computerized facilities, automated checkouts, and a social café venue.\n\nTwenty years ago, the central section of the library was occupied by multiple parallel rows of traditional study desks. Today, this space has been modernized with relaxed seating and ergonomic collaborative furniture. Along the left-hand wall, the original physical newspaper stands and enquiry counter have been dismantled to integrate a customer café along with self-service automated return machines.\n\nOn the right side of the ground floor, the historical children's book corner has been significantly enlarged, incorporating a designated storytelling area and an adjoining events room for workshops. At the rear of the library, the quiet reading room previously reserved for reference books has been entirely repurposed into a state-of-the-art computer station housing 20 desktop computers. Lastly, the main foyer now features digital scan gates in lieu of the traditional manual issue counter.",
    keyVocabulary: [
      { word: "print-book repository", meaning: "kho lưu trữ sách in truyền thống" },
      { word: "ergonomic collaborative furniture", meaning: "nội thất làm việc nhóm hiện đại, công thái học" },
      { word: "state-of-the-art computer station", meaning: "khu vực máy tính hiện đại bậc nhất" },
      { word: "entirely repurposed into", meaning: "hoàn toàn được chuyển đổi công năng thành" }
    ],
    wordCount: 196,
    bandScore: "8.5"
  },
  {
    id: 8,
    title: "[Cambridge 18 - Test 4] Monthly Price Change of Three Industrial Metals in 2014",
    chartType: "line",
    category: "Commodities & Global Trade",
    prompt: "The graph below shows the average monthly change in the prices of three metals (copper, nickel, and zinc) during 2014. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Month (2014)",
      yAxisTitle: "Price Change (%)",
      unit: "%",
      categories: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
      series: [
        {
          label: "Nickel",
          color: "#8b5cf6",
          data: [
            { name: "Jan", value: 6.0 },
            { name: "Mar", value: -1.0 },
            { name: "May", value: -3.0 },
            { name: "Jul", value: -1.5 },
            { name: "Sep", value: -2.0 },
            { name: "Nov", value: -0.5 },
            { name: "Dec", value: 1.0 }
          ]
        },
        {
          label: "Copper",
          color: "#f59e0b",
          data: [
            { name: "Jan", value: 2.0 },
            { name: "Mar", value: 1.0 },
            { name: "May", value: 1.5 },
            { name: "Jul", value: -0.5 },
            { name: "Sep", value: 1.0 },
            { name: "Nov", value: 1.5 },
            { name: "Dec", value: 1.5 }
          ]
        },
        {
          label: "Zinc",
          color: "#10b981",
          data: [
            { name: "Jan", value: 1.0 },
            { name: "Mar", value: -1.0 },
            { name: "May", value: -1.0 },
            { name: "Jul", value: 0.5 },
            { name: "Sep", value: 0.0 },
            { name: "Nov", value: -1.0 },
            { name: "Dec", value: 2.0 }
          ]
        }
      ]
    },
    overview: "Overall, nickel displayed the most pronounced price volatility throughout 2014, tumbling into deep negative territory mid-year before rallying slightly. In contrast, copper and zinc registered substantially milder monthly variations, concluding the year with positive price appreciation.",
    sampleAnswerBand8: "The line chart tracks the monthly percentage fluctuations in the global trading prices of nickel, copper, and zinc across the twelve months of 2014.\n\nOverall, nickel displayed the most pronounced price volatility throughout 2014, tumbling into deep negative territory mid-year before rallying slightly. In contrast, copper and zinc registered substantially milder monthly variations, concluding the year with positive price appreciation.\n\nCommencing in January 2014, nickel opened with an impressive monthly price surge of 6.0%, towering above both copper (2.0%) and zinc (1.0%). However, nickel experienced a dramatic reversal over the subsequent four months, collapsing to -3.0% by May. It persisted in negative territory through summer and autumn, fluctuating between -1.0% and -2.0%, before finally rebounding into positive growth at 1.0% in December.\n\nBy comparison, copper values were distinctly less erratic. Aside from a transient drop to -0.5% in July, copper remained consistently above the baseline, fluctuating gently between 1.0% and 2.0% before settling at 1.5% in December. Zinc mirrored this subdued behaviour, hovering between -1.0% and 0.5% for most of the year, prior to a final rally that peaked at 2.0% at year-end, outperforming both other metals.",
    keyVocabulary: [
      { word: "pronounced price volatility", meaning: "sự biến động giá rất rõ rệt" },
      { word: "tumbling into deep negative territory", meaning: "lao dốc sâu vào vùng âm" },
      { word: "distinctly less erratic", meaning: "ít thất thường, ổn định hơn rõ rệt" },
      { word: "transient drop", meaning: "sự giảm sút mang tính tạm thời" }
    ],
    wordCount: 208,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 17 ====================
  {
    id: 9,
    title: "[Cambridge 17 - Test 1] Redevelopment Plan of Norbiton Industrial Area",
    chartType: "map",
    category: "Urban Planning & Civil Engineering",
    prompt: "The maps below show an industrial area in the town of Norbiton and the planned future development of the site. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Industrial Core & Factories",
          pastStatus: "Cluster of 12 industrial factories alongside access roads",
          presentStatus: "Factories completely demolished and replaced by modern residential housing blocks",
          type: "residential"
        },
        {
          name: "Farmland & Riverbank",
          pastStatus: "Undeveloped agricultural farmland situated north of the river",
          presentStatus: "Connected via a new pedestrian river bridge, adding houses & riverside path",
          type: "nature"
        },
        {
          name: "Community Infrastructure",
          pastStatus: "No public amenities or schools on site",
          presentStatus: "Constructed community hall, primary school, playground & public medical centre",
          type: "commercial"
        },
        {
          name: "Retail & Commercial Hub",
          pastStatus: "Zero retail presence",
          presentStatus: "Built modern shopping precinct with supermarket and local specialty stores",
          type: "commercial"
        },
        {
          name: "Road Network & Roundabout",
          pastStatus: "Single dead-end access road connecting south to town centre",
          presentStatus: "Circular ring road with dual roundabouts and improved bus linkages",
          type: "transport"
        }
      ]
    },
    overview: "Overall, the planned scheme envisions a comprehensive transformation of Norbiton from a secluded industrial factory zone into a fully integrated, self-contained residential community equipped with housing, civic amenities, expanded roadways, and river crossing access.",
    sampleAnswerBand8: "The maps contrast the current industrial configuration of the Norbiton district with its projected master plan for comprehensive residential redevelopment.\n\nOverall, the planned scheme envisions a comprehensive transformation of Norbiton from a secluded industrial factory zone into a fully integrated, self-contained residential community equipped with housing, civic amenities, expanded roadways, and river crossing access.\n\nAt present, the site is exclusively industrial, dominated by a cluster of manufacturing factories lining an east-west cul-de-sac branching off a southern roundabout. North of the river, the landscape consists entirely of vacant farmland.\n\nUnder the redevelopment masterplan, every existing factory will be leveled to make way for extensive housing settlements. A newly built bridge will span the river to unlock the northern farmland, introducing additional housing estates and a scenic riverbank walkway. Furthermore, social infrastructure will be substantially reinforced: a primary school will be erected in the eastern sector, while a medical centre and shopping stores will be positioned directly adjacent to a newly installed central roundabout. The original single road will be expanded into a circular transit loop, ensuring optimal vehicular mobility.",
    keyVocabulary: [
      { word: "secluded industrial factory zone", meaning: "khu vực nhà máy công nghiệp biệt lập" },
      { word: "self-contained residential community", meaning: "khu đô thị dân cư khép kín đầy đủ tiện ích" },
      { word: "social infrastructure will be reinforced", meaning: "cơ sở hạ tầng xã hội sẽ được củng cố mạnh mẽ" },
      { word: "optimal vehicular mobility", meaning: "khả năng lưu thông phương tiện tối ưu" }
    ],
    wordCount: 203,
    bandScore: "8.5"
  },
  {
    id: 10,
    title: "[Cambridge 17 - Test 2] Police Funding Revenue Sources and Expenditure (2017 vs 2018)",
    chartType: "table",
    category: "Public Sector Finance & Law Enforcement",
    prompt: "The table below shows the sources of police budget in a British area in 2017 and 2018, and where the money was spent. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "table",
      tableHeaders: ["Budget Sources & Spending Area", "2017 (£ Millions)", "2018 (£ Millions)", "Net Change"],
      tableRows: [
        ["National Government Grant", "£175.5m", "£177.8m", "+£2.3m"],
        ["Local Council Tax Revenue", "£91.2m", "£102.3m", "+£11.1m"],
        ["Other Grants & Commercial Sources", "£38.0m", "£38.5m", "+£0.5m"],
        ["Total Police Budget Received", "£304.7m", "£318.6m", "+£13.9m"],
        ["Salaries (Officers & Civilian Staff)", "£228.5m (75%)", "£220.8m (69%)", "-£7.7m"],
        ["Technology & Digital Upgrades", "£24.4m (8%)", "£44.6m (14%)", "+£20.2m"],
        ["Buildings, Transport & Facilities", "£51.8m (17%)", "£53.2m (17%)", "+£1.4m"]
      ]
    },
    overview: "Overall, total police financial resources increased moderately by approximately £13.9 million between 2017 and 2018, driven primarily by higher local tax collections. In terms of expenditure, funding for technology saw a substantial expansion, while workforce salary costs witnessed a slight retrenchment.",
    sampleAnswerBand8: "The table delineates the financial revenue origins and departmental resource allocation of a regional British police department across two successive financial years, 2017 and 2018.\n\nOverall, total police financial resources increased moderately by approximately £13.9 million between 2017 and 2018, driven primarily by higher local tax collections. In terms of expenditure, funding for technology saw a substantial expansion, while workforce salary costs witnessed a slight retrenchment.\n\nExamining the revenue streams first, total funding rose from £304.7 million in 2017 to £318.6 million in 2018. The national government remained the principal benefactor, contributing £175.5 million initially, edging up slightly to £177.8 million. However, local council taxes registered the most pronounced increase, escalating by £11.1 million from £91.2 million to £102.3 million. Other secondary sources remained virtually static around £38 million.\n\nRegarding budgetary expenditure, personnel remuneration (officer and staff salaries) consumed the overwhelming majority of funding in both years, although its share dropped from £228.5 million (75%) to £220.8 million (69%). Conversely, technological expenditure nearly doubled, surging from £24.4 million (8%) to £44.6 million (14%). Spending on physical buildings and transport infrastructure remained virtually unchanged in proportional terms at 17%, edging up from £51.8 million to £53.2 million.",
    keyVocabulary: [
      { word: "departmental resource allocation", meaning: "sự phân bổ nguồn lực của các phòng ban" },
      { word: "principal benefactor", meaning: "nhà tài trợ, nguồn cấp ngân sách chủ yếu" },
      { word: "personnel remuneration", meaning: "chi phí đãi ngộ, lương nhân sự" },
      { word: "substantive expansion", meaning: "sự mở rộng thực chất và đáng kể" }
    ],
    wordCount: 212,
    bandScore: "8.5"
  },
  {
    id: 11,
    title: "[Cambridge 17 - Test 3] Weekly Household Expenditure in One Country (1968 vs 2018)",
    chartType: "bar",
    category: "Household Economics & Consumer Spending",
    prompt: "The chart below shows the percentage of weekly income that families in one country spent on different items in 1968 and 2018. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Spending Category",
      yAxisTitle: "% of Weekly Income",
      unit: "%",
      categories: ["Food", "Housing", "Fuel & Power", "Clothing & Footwear", "Household Goods", "Personal Goods", "Transport", "Leisure"],
      series: [
        {
          label: "1968",
          color: "#ec4899",
          data: [
            { name: "Food", value: 35 },
            { name: "Housing", value: 10 },
            { name: "Fuel & Power", value: 6 },
            { name: "Clothing", value: 10 },
            { name: "Household Goods", value: 8 },
            { name: "Personal Goods", value: 8 },
            { name: "Transport", value: 8 },
            { name: "Leisure", value: 9 }
          ]
        },
        {
          label: "2018",
          color: "#3b82f6",
          data: [
            { name: "Food", value: 17 },
            { name: "Housing", value: 19 },
            { name: "Fuel & Power", value: 4 },
            { name: "Clothing", value: 5 },
            { name: "Household Goods", value: 8 },
            { name: "Personal Goods", value: 4 },
            { name: "Transport", value: 14 },
            { name: "Leisure", value: 22 }
          ]
        }
      ]
    },
    overview: "Overall, expenditure patterns underwent a fundamental restructuring over the 50-year interval. While essential sustenance (food and clothing) absorbed a vastly reduced share of family earnings in 2018, discretionary leisure, housing, and transport captured markedly greater proportions.",
    sampleAnswerBand8: "The comparative bar chart demonstrates changes in the average proportion of weekly family income allotted across eight distinct expenditure categories in a single nation between 1968 and 2018.\n\nOverall, expenditure patterns underwent a fundamental restructuring over the 50-year interval. While essential sustenance (food and clothing) absorbed a vastly reduced share of family earnings in 2018, discretionary leisure, housing, and transport captured markedly greater proportions.\n\nIn 1968, groceries and food items accounted for the lion's share of typical domestic outlays at 35%. By 2018, this figure had more than halved to just 17%. Clothing and footwear experienced an identical downward trajectory, sliding from 10% in 1968 to exactly 5% fifty years later. Allocations for fuel and domestic energy also declined slightly from 6% to 4%.\n\nConversely, leisure activities surged to become the foremost budget priority in 2018, rocketing from 9% to 22%. Housing costs registered a near twofold escalation, advancing from 10% to 19% to rank as the second largest expenditure component in 2018. Transportation spending mirrored this upward trend, climbing from 8% to 14%. Household goods remained unchanged at 8%, while personal goods dropped from 8% to 4%.",
    keyVocabulary: [
      { word: "fundamental restructuring", meaning: "sự tái cấu trúc mang tính căn bản" },
      { word: "essential sustenance", meaning: "chi phí thiết yếu cho đời sống" },
      { word: "discretionary leisure", meaning: "chi tiêu giải trí không bắt buộc" },
      { word: "near twofold escalation", meaning: "sự leo thang gần gấp đôi" }
    ],
    wordCount: 205,
    bandScore: "8.5"
  },
  {
    id: 12,
    title: "[Cambridge 17 - Test 4] Commercial Shop Openings and Closures (2011-2018)",
    chartType: "line",
    category: "Retail, Business & Commerce",
    prompt: "The graph below shows the number of shops that closed and the number of new shops that opened in one country between 2011 and 2018. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Number of Shops",
      unit: "Shops",
      categories: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
      series: [
        {
          label: "Shop Openings",
          color: "#10b981",
          data: [
            { name: "2011", value: 8500 },
            { name: "2012", value: 4000 },
            { name: "2013", value: 4000 },
            { name: "2014", value: 6200 },
            { name: "2015", value: 4000 },
            { name: "2016", value: 4100 },
            { name: "2017", value: 4100 },
            { name: "2018", value: 3000 }
          ]
        },
        {
          label: "Shop Closures",
          color: "#ef4444",
          data: [
            { name: "2011", value: 6400 },
            { name: "2012", value: 6000 },
            { name: "2013", value: 7100 },
            { name: "2014", value: 6500 },
            { name: "2015", value: 6000 },
            { name: "2016", value: 5100 },
            { name: "2017", value: 5000 },
            { name: "2018", value: 5100 }
          ]
        }
      ]
    },
    overview: "Overall, both store inaugurations and permanent closures exhibited significant fluctuations throughout the period, with both metrics finishing in 2018 at levels noticeably below their initial 2011 values. In the majority of years surveyed, closures outnumbered new openings.",
    sampleAnswerBand8: "The line graph documents the annual volume of commercial retail shop inaugurations and permanent shutdowns recorded in a specific nation across an eight-year timeframe from 2011 to 2018.\n\nOverall, both store inaugurations and permanent closures exhibited significant fluctuations throughout the period, with both metrics finishing in 2018 at levels noticeably below their initial 2011 values. In the majority of years surveyed, closures outnumbered new openings.\n\nIn 2011, new shop openings peaked at approximately 8,500 outlets, substantially exceeding closures, which stood at roughly 6,400. However, new registrations plunged precipitously to 4,000 in 2012, matching the rate in 2013 before staging a transient recovery to 6,200 in 2014. Subsequently, openings dropped back to 4,000 in 2015 and maintained stability until 2017, prior to descending to an all-time nadir of 3,000 in 2018.\n\nIn terms of shop closures, the figure hovered between 6,000 and 6,400 during the initial two years, before spiking to a summit of roughly 7,100 in 2013. Following this high point, closures subsided progressively over the next three years to reach 5,100 in 2016, a level where it effectively stabilized through 2017 and 2018, continuously outstripping new openings after 2014.",
    keyVocabulary: [
      { word: "store inaugurations", meaning: "sự khai trương các cửa hàng mới" },
      { word: "permanent shutdowns", meaning: "các vụ đóng cửa vĩnh viễn" },
      { word: "plunged precipitously", meaning: "lao dốc một cách đột ngột" },
      { word: "all-time nadir", meaning: "điểm đáy thấp nhất trong lịch sử khảo sát" }
    ],
    wordCount: 209,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 16 ====================
  {
    id: 13,
    title: "[Cambridge 16 - Test 1] Electrical Appliance Ownership & Weekly Housework Hours (1920-2019)",
    chartType: "line",
    category: "Technology, Domestic Life & Labour",
    prompt: "The line graphs below show the percentage of households with electrical appliances and the number of hours of housework per week, per household in one country between 1920 and 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Ownership % / Weekly Hours",
      unit: "% & Hours/Week",
      categories: ["1920", "1940", "1960", "1980", "2000", "2019"],
      series: [
        {
          label: "Vacuum Cleaner Ownership (%)",
          color: "#3b82f6",
          data: [
            { name: "1920", value: 30 },
            { name: "1940", value: 50 },
            { name: "1960", value: 70 },
            { name: "1980", value: 95 },
            { name: "2000", value: 100 },
            { name: "2019", value: 100 }
          ]
        },
        {
          label: "Washing Machine Ownership (%)",
          color: "#10b981",
          data: [
            { name: "1920", value: 40 },
            { name: "1940", value: 60 },
            { name: "1960", value: 72 },
            { name: "1980", value: 68 },
            { name: "2000", value: 70 },
            { name: "2019", value: 75 }
          ]
        },
        {
          label: "Refrigerator Ownership (%)",
          color: "#ec4899",
          data: [
            { name: "1920", value: 1 },
            { name: "1940", value: 44 },
            { name: "1960", value: 90 },
            { name: "1980", value: 100 },
            { name: "2000", value: 100 },
            { name: "2019", value: 100 }
          ]
        },
        {
          label: "Housework Hours (hrs/week)",
          color: "#ef4444",
          data: [
            { name: "1920", value: 50 },
            { name: "1940", value: 35 },
            { name: "1960", value: 20 },
            { name: "1980", value: 15 },
            { name: "2000", value: 12 },
            { name: "2019", value: 10 }
          ]
        }
      ]
    },
    overview: "Overall, the proportion of homes owning domestic labor-saving appliances climbed dramatically, with refrigerators and vacuum cleaners achieving universal adoption by the turn of the millennium. Concurrently, time spent on weekly chores declined fivefold.",
    sampleAnswerBand8: "The graphs depict the evolution of home appliance adoption rates alongside the average weekly hours allocated to domestic housework per family in a particular nation spanning a century from 1920 to 2019.\n\nOverall, the proportion of homes owning domestic labor-saving appliances climbed dramatically, with refrigerators and vacuum cleaners achieving universal adoption by the turn of the millennium. Concurrently, time spent on weekly chores declined fivefold.\n\nIn 1920, refrigerators were virtually non-existent, found in merely 1% of households. However, ownership surged spectacularly over the subsequent four decades to touch 90% in 1960, before reaching full 100% saturation by 1980. Vacuum cleaners experienced a comparable ascending trajectory, expanding from 30% in 1920 to 95% in 1980, eventually attaining universal presence by 2000. Washing machines commenced at 40% and grew steadily to 72% in 1960, subsequently hovering between 68% and 75%.\n\nIn striking inverse symmetry, the time spent performing domestic chores dropped precipitously. While an average family committed 50 hours weekly to household maintenance in 1920, this figure plummeted to 20 hours by 1960 and steadily tapered to an all-time low of just 10 hours per week in 2019.",
    keyVocabulary: [
      { word: "labor-saving appliances", meaning: "các thiết bị giải phóng sức lao động" },
      { word: "universal adoption", meaning: "sự phổ cập toàn diện (100%)" },
      { word: "striking inverse symmetry", meaning: "sự đối xứng nghịch đảo đầy ấn tượng" },
      { word: "steadily tapered", meaning: "thu hẹp, giảm dần đều" }
    ],
    wordCount: 205,
    bandScore: "8.5"
  },
  {
    id: 14,
    title: "[Cambridge 16 - Test 2] Industrial Production of Sugar from Sugar Cane",
    chartType: "process",
    category: "Agribusiness, Food & Industry",
    prompt: "The diagram below shows the manufacturing process of making sugar from sugar cane. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "Cultivation & Maturation",
          description: "Sugar cane is cultivated in warm agricultural fields for 12 to 18 months until fully mature.",
          icon: "🌱"
        },
        {
          stepNumber: 2,
          title: "Harvesting",
          description: "Matured stalks are reaped either manually using machetes or mechanically with heavy harvesters.",
          icon: "🌾"
        },
        {
          stepNumber: 3,
          title: "Crushing & Juice Extraction",
          description: "Cane stalks are fed into industrial roller mills to crush and squeeze out raw green cane juice.",
          icon: "⚙️"
        },
        {
          stepNumber: 4,
          title: "Purification & Filtering",
          description: "Raw cane juice is poured into limestone filter vats to remove impurities and suspended pulp.",
          icon: "💧"
        },
        {
          stepNumber: 5,
          title: "Evaporator Boiling",
          description: "Filtered liquid is heated in thermal evaporators, boiling off moisture until thick syrup forms.",
          icon: "♨️"
        },
        {
          stepNumber: 6,
          title: "Centrifugation",
          description: "Hot sugar syrup is spun rapidly in centrifuges to separate crystal granules from black molasses.",
          icon: "🌀"
        },
        {
          stepNumber: 7,
          title: "Drying & Cooling",
          description: "Extracted sugar crystals are dried under warm air streams, cooled, and packaged for commercial distribution.",
          icon: "🍬"
        }
      ]
    },
    overview: "Overall, the manufacturing of refined sugar from raw cane comprises seven distinct chronological stages, transitioning from agricultural cultivation and harvesting to mechanical crushing, chemical purification, thermal evaporation, and centrifugal crystal isolation.",
    sampleAnswerBand8: "The provided flow diagram details the seven sequential stages involved in the commercial manufacture of refined sugar from agricultural sugar cane.\n\nOverall, the manufacturing of refined sugar from raw cane comprises seven distinct chronological stages, transitioning from agricultural cultivation and harvesting to mechanical crushing, chemical purification, thermal evaporation, and centrifugal crystal isolation.\n\nThe process begins in the field, where sugar cane plants are cultivated over a maturation cycle spanning 12 to 18 months. Once mature, the stalks are harvested using one of two methods: manual labor using hand tools or specialized mechanized harvesters. In the subsequent stage, the freshly cut stalks are conveyed into heavy industrial crushing cylinders that extract raw cane juice.\n\nIn the fourth step, the extracted green juice is channeled through a limestone filtering chamber to eliminate particulates and clarify the fluid. Following purification, the clean juice enters a boiler evaporator where intensive heating drives off water content, transforming the liquid into concentrated, dense syrup. This syrup is subsequently transferred into a high-speed centrifuge which rapidly rotates the mixture, successfully separating solid sugar crystals from residual liquid molasses. In the final phase, the moist sugar crystals are aerated in a drying and cooling unit, yielding refined granulated sugar ready for commercial packaging.",
    keyVocabulary: [
      { word: "maturation cycle", meaning: "chu kỳ sinh trưởng chín muồi" },
      { word: "conveyed into", meaning: "được vận chuyển vào trong" },
      { word: "eliminates particulates", meaning: "loại bỏ các tạp chất lơ lửng" },
      { word: "granulated sugar", meaning: "đường hạt thành phẩm" }
    ],
    wordCount: 218,
    bandScore: "8.5"
  },
  {
    id: 15,
    title: "[Cambridge 16 - Test 3] Redevelopment Plans for a Regional Airport",
    chartType: "map",
    category: "Aviation & Infrastructure",
    prompt: "The diagrams below show the site of an airport now and how it will look after planned redevelopment next year. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Terminal Gates",
          pastStatus: "Single corridor walkway connecting to 8 boarding gates",
          presentStatus: "Y-shaped concourses with automated sky-train servicing 18 gates",
          type: "transport"
        },
        {
          name: "Terminal Building Facilities",
          pastStatus: "Basic check-in desks and modest security screening portal",
          presentStatus: "Relocated check-in to accommodate duty-free retail, bag-drop kiosks, and lounges",
          type: "commercial"
        },
        {
          name: "Ground Transport Access",
          pastStatus: "Bus stop and taxi rank outside entrance",
          presentStatus: "Integrated direct high-speed metro train station linking directly to terminal",
          type: "transport"
        },
        {
          name: "Passenger Arrivals Area",
          pastStatus: "Simple baggage reclaim hall with custom exit",
          presentStatus: "Enlarged baggage reclaim hall, ATM exchange, car rental desks, and café",
          type: "commercial"
        }
      ]
    },
    overview: "Overall, the airport redevelopment plan envisions a major structural expansion to more than double passenger gate capacity from 8 to 18, incorporate a dedicated rapid rail link, and broaden commercial shopping and hospitality amenities.",
    sampleAnswerBand8: "The maps illustrate the existing infrastructural configuration of a regional airport alongside its scheduled modern redevelopment set for completion next year.\n\nOverall, the airport redevelopment plan envisions a major structural expansion to more than double passenger gate capacity from 8 to 18, incorporate a dedicated rapid rail link, and broaden commercial shopping and hospitality amenities.\n\nCurrently, travelers entering the main terminal proceed through check-in desks on the left and security screening on the right, exiting to a single linear concourse that services eight boarding gates. In the planned layout, check-in will be relocated to the right of the entrance to clear expansive floor space for a duty-free shopping precinct and dining cafes. To the north, the linear concourse will be replaced by two extended angled concourses connected by an automated transit walkway, more than doubling the gate count to eighteen.\n\nSignificant upgrades are also designated for the southern ground access zone. While the current airport relies exclusively on a curbside bus terminal and taxi zone, the future layout introduces a fully integrated subway railway station directly servicing the main terminal concourse. Furthermore, the arrivals exit will feature newly added car rental agencies and currency exchange booths.",
    keyVocabulary: [
      { word: "scheduled modern redevelopment", meaning: "dự án tái phát triển hiện đại đã lên lịch" },
      { word: "duty-free shopping precinct", meaning: "khu phố mua sắm miễn thuế" },
      { word: "automated transit walkway", meaning: "lối đi bộ băng chuyền tự động" },
      { word: "curbside bus terminal", meaning: "bến xe buýt ven đường" }
    ],
    wordCount: 207,
    bandScore: "8.5"
  },
  {
    id: 16,
    title: "[Cambridge 16 - Test 4] The Lifecycle and Recycling Process of Plastic Bottles",
    chartType: "process",
    category: "Environment & Recycling",
    prompt: "The diagram below shows the process of recycling plastic bottles. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "Disposal & Collection",
          description: "Post-consumer plastic bottles are placed in recycling bins and collected by municipal recycling trucks.",
          icon: "🗑️"
        },
        {
          stepNumber: 2,
          title: "Sorting & Baling",
          description: "Bottles are sorted by polymer type and compressed into dense, stackable rectangular bales.",
          icon: "📦"
        },
        {
          stepNumber: 3,
          title: "Crushing into Flakes",
          description: "Bales are cut open and plastic bottles are fed into rotary shredders, crushed into miniature plastic flakes.",
          icon: "⚙️"
        },
        {
          stepNumber: 4,
          title: "Washing & Sterilization",
          description: "Plastic flakes undergo intensive washing in water baths to dissolve chemical adhesives and labels.",
          icon: "🧼"
        },
        {
          stepNumber: 5,
          title: "Extrusion & Pelletizing",
          description: "Clean flakes are melted in a high-temperature furnace and extruded into uniform plastic pellets.",
          icon: "🔥"
        },
        {
          stepNumber: 6,
          title: "Final Product Manufacturing",
          description: "Pellets are reheated and spun into polyester fiber for clothing or molded into new containers and bottles.",
          icon: "👕"
        }
      ]
    },
    overview: "Overall, plastic bottle recycling is a six-stage cyclical manufacturing procedure that converts post-consumer discarded bottles into raw industrial pellets, which are then remanufactured into fabrics, packaging, and household goods.",
    sampleAnswerBand8: "The diagram outlines the circular manufacturing cycle through which discarded plastic beverage containers are collected, industrially processed, and repurposed into new consumer merchandise.\n\nOverall, plastic bottle recycling is a six-stage cyclical manufacturing procedure that converts post-consumer discarded bottles into raw industrial pellets, which are then remanufactured into fabrics, packaging, and household goods.\n\nThe procedure initiates at the consumer level, where used plastic bottles are deposited into specialized recycling receptacles before municipal refuse vehicles collect and transport them to a central processing plant. Upon arrival, the bottles are categorized according to plastic grade, and unusable materials are culled before the bottles are compacted under hydraulic pressure into large rectangular blocks known as bales.\n\nIn the third stage, these bales are unbundled and run through mechanical shredding blades that pulverize the bottles into small plastic flakes. These shredded fragments then enter hot water washing tanks where residual paper labels, adhesive glue, and contaminants are thoroughly rinsed away. Following sanitization, the purified flakes are fed into an industrial thermal oven where they melt and are subsequently extruded into uniform cylindrical pellets. In the final phase, these recycled pellets serve as raw resin to fabricate end products such as polyester fleece garments, carpeting, and new bottles.",
    keyVocabulary: [
      { word: "circular manufacturing cycle", meaning: "chu kỳ sản xuất tuần hoàn" },
      { word: "compacted under hydraulic pressure", meaning: "được nén chặt dưới áp lực thủy lực" },
      { word: "mechanical shredding blades", meaning: "lưỡi dao băm xé cơ học" },
      { word: "extruded into uniform cylindrical pellets", meaning: "được đùn ép thành các hạt nhựa hình trụ đồng đều" }
    ],
    wordCount: 220,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 15 ====================
  {
    id: 17,
    title: "[Cambridge 15 - Test 1] Coffee and Tea Drinking Habits in Five Australian Cities",
    chartType: "bar",
    category: "Consumer Behavior & Lifestyle",
    prompt: "The chart below shows the results of a survey about people's coffee and tea buying and drinking habits in five Australian cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "City",
      yAxisTitle: "% of Residents",
      unit: "%",
      categories: ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Hobart"],
      series: [
        {
          label: "Bought Fresh Coffee (Last 4 Wks)",
          color: "#ec4899",
          data: [
            { name: "Sydney", value: 43.7 },
            { name: "Melbourne", value: 42.5 },
            { name: "Brisbane", value: 34.2 },
            { name: "Adelaide", value: 34.5 },
            { name: "Hobart", value: 38.3 }
          ]
        },
        {
          label: "Bought Instant Coffee (Last 4 Wks)",
          color: "#3b82f6",
          data: [
            { name: "Sydney", value: 45.8 },
            { name: "Melbourne", value: 48.3 },
            { name: "Brisbane", value: 52.8 },
            { name: "Adelaide", value: 49.8 },
            { name: "Hobart", value: 54.1 }
          ]
        },
        {
          label: "Went to a Café for Coffee or Tea",
          color: "#10b981",
          data: [
            { name: "Sydney", value: 61.2 },
            { name: "Melbourne", value: 63.5 },
            { name: "Brisbane", value: 55.4 },
            { name: "Adelaide", value: 49.5 },
            { name: "Hobart", value: 62.7 }
          ]
        }
      ]
    },
    overview: "Overall, visiting cafés for coffee or tea was comfortably the most prevalent habit across four of the five cities (Adelaide being the sole exception). Furthermore, buying instant coffee consistently eclipsed fresh coffee purchases throughout every city surveyed.",
    sampleAnswerBand8: "The bar chart compares five major Australian metropolises (Sydney, Melbourne, Brisbane, Adelaide, and Hobart) based on the percentages of urban residents participating in three specific hot beverage purchasing patterns over a four-week survey period.\n\nOverall, visiting cafés for coffee or tea was comfortably the most prevalent habit across four of the five cities (Adelaide being the sole exception). Furthermore, buying instant coffee consistently eclipsed fresh coffee purchases throughout every city surveyed.\n\nExamining café attendance, Melbourne registered the highest enthusiasm at 63.5%, closely shadowed by Hobart at 62.7% and Sydney at 61.2%. Brisbane also exhibited robust figures at 55.4%. Adelaide was the only city where café visits failed to reach a majority, recording 49.5%.\n\nIn terms of packaged beverage purchases, instant coffee demonstrated clear consumer dominance over fresh roast coffee in all five cities. In Hobart and Brisbane, instant coffee purchases reached peaks of 54.1% and 52.8% respectively, compared to roughly 38% and 34% for fresh coffee. Sydney and Melbourne posted roughly comparable figures for fresh coffee at roughly 43%, but were still surpassed by their local instant coffee tallies (45.8% and 48.3% respectively). Adelaide recorded the lowest overall demand for fresh coffee at 34.5%.",
    keyVocabulary: [
      { word: "prevalent habit", meaning: "thói quen phổ biến, chiếm ưu thế" },
      { word: "consistently eclipsed", meaning: "luôn luôn vượt mặt, lấn át" },
      { word: "packaged beverage purchases", meaning: "việc mua đồ uống đóng gói sẵn" },
      { word: "clear consumer dominance", meaning: "sự thống trị rõ ràng trong thị hiếu tiêu dùng" }
    ],
    wordCount: 201,
    bandScore: "8.5"
  },
  {
    id: 18,
    title: "[Cambridge 15 - Test 2] Tourist Influx on a Caribbean Island (2010-2017)",
    chartType: "line",
    category: "Tourism, Travel & Hospitality",
    prompt: "The chart below shows the number of tourists visiting a particular Caribbean island between 2010 and 2017. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Visitors (Millions)",
      unit: "Million Visitors",
      categories: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
      series: [
        {
          label: "Total Tourists",
          color: "#8b5cf6",
          data: [
            { name: "2010", value: 1.0 },
            { name: "2011", value: 1.25 },
            { name: "2012", value: 1.5 },
            { name: "2013", value: 2.0 },
            { name: "2014", value: 2.6 },
            { name: "2015", value: 2.7 },
            { name: "2016", value: 3.1 },
            { name: "2017", value: 3.5 }
          ]
        },
        {
          label: "Stayed on Cruise Ships",
          color: "#3b82f6",
          data: [
            { name: "2010", value: 0.25 },
            { name: "2011", value: 0.5 },
            { name: "2012", value: 0.25 },
            { name: "2013", value: 0.5 },
            { name: "2014", value: 1.0 },
            { name: "2015", value: 1.3 },
            { name: "2016", value: 1.6 },
            { name: "2017", value: 2.0 }
          ]
        },
        {
          label: "Stayed on the Island",
          color: "#10b981",
          data: [
            { name: "2010", value: 0.75 },
            { name: "2011", value: 0.75 },
            { name: "2012", value: 1.25 },
            { name: "2013", value: 1.5 },
            { name: "2014", value: 1.5 },
            { name: "2015", value: 1.4 },
            { name: "2016", value: 1.5 },
            { name: "2017", value: 1.5 }
          ]
        }
      ]
    },
    overview: "Overall, the island witnessed dramatic tourist growth, with total visitor arrivals expanding three-and-a-half-fold over the 7-year survey. While island-based stays led during the first half of the decade, cruise ship tourists expanded rapidly to overtake them by 2016.",
    sampleAnswerBand8: "The line graph traces tourism growth on an unnamed Caribbean island from 2010 to 2017, illustrating total visitor volume alongside a breakdown by accommodation type: staying on the island versus residing aboard cruise liners.\n\nOverall, the island witnessed dramatic tourist growth, with total visitor arrivals expanding three-and-a-half-fold over the 7-year survey. While island-based stays led during the first half of the decade, cruise ship tourists expanded rapidly to overtake them by 2016.\n\nIn 2010, the island welcomed exactly 1.0 million holidaymakers in total. This figure ascended progressively year on year, accelerating sharply after 2013 to reach 2.7 million in 2015, and culminating in a historical peak of 3.5 million visitors in 2017.\n\nRegarding traveler preferences, tourists lodging ashore on the island initially accounted for the lion's share, remaining at 0.75 million until 2011 before doubling to 1.5 million by 2013. Thereafter, this demographic plateaued, fluctuating gently between 1.4 and 1.5 million. Conversely, cruise ship arrivals commenced at an understated 0.25 million in 2010. Experiencing exponential momentum after 2012, cruise passenger numbers surged eightfold to surpass island-stayers in 2016, ending at a dominant 2.0 million in 2017.",
    keyVocabulary: [
      { word: "three-and-a-half-fold", meaning: "tăng gấp 3.5 lần" },
      { word: "lodging ashore", meaning: "nghỉ dưỡng, lưu trú trên đất liền" },
      { word: "exponential momentum", meaning: "đà tăng trưởng theo cấp số nhân" },
      { word: "understated figure", meaning: "con số khiêm tốn ban đầu" }
    ],
    wordCount: 198,
    bandScore: "8.5"
  },
  {
    id: 19,
    title: "[Cambridge 15 - Test 3] The Industrial Manufacturing Process of Instant Noodles",
    chartType: "process",
    category: "Manufacturing & Food Science",
    prompt: "The diagram below shows the manufacturing process of instant noodles. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "Flour Storage & Silos",
          description: "Wheat flour is transported by tanker trucks and pumped into massive storage silos.",
          icon: "🏭"
        },
        {
          stepNumber: 2,
          title: "Mixing Dough",
          description: "Flour is blended mechanically in mixing vats with water and cooking oil into dough.",
          icon: "🥣"
        },
        {
          stepNumber: 3,
          title: "Dough Rolling",
          description: "Thick dough passes between sequential compression rollers to produce smooth, uniform sheets.",
          icon: "📜"
        },
        {
          stepNumber: 4,
          title: "Strip Cutting & Waving",
          description: "Dough sheets are fed into rotary blades, sliced into noodle strips and gathered into wavy ribbons.",
          icon: "✂️"
        },
        {
          stepNumber: 5,
          title: "Cooking & Steaming",
          description: "Wavy noodle ribbons travel through high-temperature steam tunnels to precook the starch.",
          icon: "♨️"
        },
        {
          stepNumber: 6,
          title: "Frying & Dehydration",
          description: "Steamed noodle cakes are immersed in boiling cooking oil to rapidly dehydrate and crisp.",
          icon: "🍳"
        },
        {
          stepNumber: 7,
          title: "Cooling & Cup Insertion",
          description: "Crisp noodle blocks are air-cooled and mechanically inserted into individual branded cups.",
          icon: "🧊"
        },
        {
          stepNumber: 8,
          title: "Seasoning & Sealing",
          description: "Dehydrated vegetables and seasoning sachets are added before cups are foil-sealed and shrink-wrapped.",
          icon: "📦"
        }
      ]
    },
    overview: "Overall, the production of instant cup noodles entails an eight-step linear assembly process, commencing with raw grain flour mixing, progressing through rolling, slicing, steaming, and flash-frying, and concluding with cup packaging and seasoning addition.",
    sampleAnswerBand8: "The provided diagram outlines the eight distinct operational steps involved in the factory production of instant cup noodles from raw ingredients to sealed retail items.\n\nOverall, the production of instant cup noodles entails an eight-step linear assembly process, commencing with raw grain flour mixing, progressing through rolling, slicing, steaming, and flash-frying, and concluding with cup packaging and seasoning addition.\n\nThe procedure initiates with the delivery of wheat flour by tanker vehicles into upright storage silos. Next, the flour is mixed with water and edible oil inside industrial mixing drums to form consistent dough. This dough is subsequently pushed through a sequence of heavy rollers that compress the material into uniform, flat sheets.\n\nIn the fourth step, the sheets are cut by rotating blades into long strips before being shaped into characteristic wavy noodle strands. These noodles then enter an industrial steam chamber for pre-cooking. Following steaming, the noodle strands are formed into disc-shaped cakes and submerged into hot cooking oil for flash-frying, which strips out residual moisture and imparts a crunchy texture. In the final phases, the dehydrated noodle blocks are cooled and packed into plastic or paper cups, where dried vegetables and flavor packets are deposited before the cups are foil-sealed and boxed for shipment.",
    keyVocabulary: [
      { word: "linear assembly process", meaning: "quy trình lắp ráp sản xuất dạng tuyến tính" },
      { word: "compression rollers", meaning: "các con lăn nén ép" },
      { word: "flash-frying", meaning: "chiên nhanh ngập dầu nhiệt độ cao" },
      { word: "residual moisture", meaning: "độ ẩm còn sót lại" }
    ],
    wordCount: 220,
    bandScore: "8.5"
  },
  {
    id: 20,
    title: "[Cambridge 15 - Test 4] Employment Status of Anthropology Graduates After Five Years",
    chartType: "pie",
    category: "Higher Education & Employment",
    prompt: "The first chart below shows the destination of anthropology graduates from one university after graduation. The second chart shows their salaries after five years of work. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "pie",
      series: [
        {
          label: "Destination of Graduates",
          data: [
            { name: "Full-time Work", value: 52 },
            { name: "Part-time Work", value: 15 },
            { name: "Part-time Work & Study", value: 5 },
            { name: "Full-time Postgrad Study", value: 8 },
            { name: "Unemployed", value: 12 },
            { name: "Not Known", value: 8 }
          ]
        },
        {
          label: "Salary After 5 Years in Government Sector",
          data: [
            { name: "$25,000 - $49,999", value: 5 },
            { name: "$50,000 - $74,999", value: 15 },
            { name: "$75,000 - $99,999", value: 30 },
            { name: "$100,000+", value: 50 }
          ]
        },
        {
          label: "Salary After 5 Years in Private Companies",
          data: [
            { name: "$25,000 - $49,999", value: 10 },
            { name: "$50,000 - $74,999", value: 35 },
            { name: "$75,000 - $99,999", value: 25 },
            { name: "$100,000+", value: 30 }
          ]
        }
      ]
    },
    overview: "Overall, the majority of anthropology graduates entered full-time employment upon graduation. Furthermore, career outcomes after five years demonstrated that professionals working in the public government sector enjoyed significantly higher proportions of top-tier salaries ($100,000+) compared to private sector counterparts.",
    sampleAnswerBand8: "The pie charts illustrate the career destinations of anthropology degree holders from a particular tertiary institution upon graduation, alongside remuneration brackets attained across public and private employment sectors after five years in the workforce.\n\nOverall, the majority of anthropology graduates entered full-time employment upon graduation. Furthermore, career outcomes after five years demonstrated that professionals working in the public government sector enjoyed significantly higher proportions of top-tier salaries ($100,000+) compared to private sector counterparts.\n\nExamining graduate destinations, just over half (52%) secured full-time employment immediately, representing the single largest category by a considerable margin. Part-time work accounted for 15%, while those combining part-time jobs with further study represented 5%. Only 8% committed solely to full-time postgraduate education, while 12% were registered as unemployed, and the remaining 8% were unaccounted for.\n\nAfter five years of professional experience, government workers reaped noticeably superior financial packages. Exactly half (50%) of public servants earned $100,000 or more, whereas only 30% of corporate employees reached this benchmark. Middle salaries ($50,000 to $74,999) were more prevalent in private enterprise (35%) than in government (15%). Low salaries ($25,000 to $49,999) were rare in both sectors, representing 10% in private corporations and just 5% in government bodies.",
    keyVocabulary: [
      { word: "career destinations", meaning: "hướng đi sự nghiệp sau tốt nghiệp" },
      { word: "remuneration brackets", meaning: "các khung thu nhập, thang lương" },
      { word: "considerable margin", meaning: "khoảng cách chênh lệch đáng kể" },
      { word: "superior financial packages", meaning: "các gói đãi ngộ tài chính vượt trội hơn" }
    ],
    wordCount: 215,
    bandScore: "8.5"
  },
// ==================== CAMBRIDGE 14 ====================
  {
    id: 21,
    title: "[Cambridge 14 - Test 1] Average Dietary Intake of Nutrients in US Meals",
    chartType: "pie",
    category: "Health, Nutrition & Diet",
    prompt: "The charts below show the average percentages in typical meals of three types of nutrients, all of which may be unhealthy if eaten too much. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "pie",
      series: [
        {
          label: "Sodium Consumption by Meal",
          data: [
            { name: "Dinner", value: 43 },
            { name: "Lunch", value: 29 },
            { name: "Snacks", value: 14 },
            { name: "Breakfast", value: 14 }
          ]
        },
        {
          label: "Saturated Fat Consumption by Meal",
          data: [
            { name: "Dinner", value: 37 },
            { name: "Lunch", value: 26 },
            { name: "Snacks", value: 21 },
            { name: "Breakfast", value: 16 }
          ]
        },
        {
          label: "Added Sugar Consumption by Meal",
          data: [
            { name: "Snacks", value: 42 },
            { name: "Dinner", value: 23 },
            { name: "Lunch", value: 19 },
            { name: "Breakfast", value: 16 }
          ]
        }
      ]
    },
    overview: "Overall, dinner and lunch contributed the vast majority of sodium and saturated fat intake, while added sugar was overwhelmingly consumed via between-meal snacks.",
    sampleAnswerBand8: "The pie charts illustrate the distribution of three potentially deleterious dietary nutrients (sodium, saturated fat, and added sugar) across four standard dining occasions in the United States: breakfast, lunch, dinner, and snacks.\n\nOverall, dinner and lunch contributed the vast majority of sodium and saturated fat intake, while added sugar was overwhelmingly consumed via between-meal snacks.\n\nRegarding dinner, it was unequivocally the primary culprit for sodium and saturated fat, accounting for 43% and 37% of daily totals respectively. Lunch ranked as the second largest contributor for both nutrients, responsible for 29% of sodium and 26% of saturated fats. In contrast, snacks provided 21% of saturated fat and 14% of sodium, while breakfast registered modest intakes of 16% and 14% respectively.\n\nA markedly contrasting distribution occurred with added sugars. Here, snacks dominated conspicuously, making up 42% of total daily sugar consumption. Dinner contributed approximately half that amount at 23%, followed by lunch at 19%. Breakfast provided the lowest proportion across all three surveyed nutrients, contributing merely 16% of daily added sugars.",
    keyVocabulary: [
      { word: "deleterious dietary nutrients", meaning: "các chất dinh dưỡng có hại cho sức khỏe" },
      { word: "primary culprit", meaning: "thủ phạm chính, nguồn đóng góp lớn nhất" },
      { word: "markedly contrasting distribution", meaning: "sự phân bổ tương phản rõ rệt" },
      { word: "dominated conspicuously", meaning: "chiếm ưu thế một cách rõ ràng" }
    ],
    wordCount: 192,
    bandScore: "8.5"
  },
  {
    id: 22,
    title: "[Cambridge 14 - Test 2] Structural Evolution of Grange Park (1920 vs Present Day)",
    chartType: "map",
    category: "Public Parks & Civic Spaces",
    prompt: "The plans below show a public park when it first opened in 1920 and the same park today. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Northern Section",
          pastStatus: "Ornate glass fountain flanked by formal seating",
          presentStatus: "Demolished and replaced by a modern amphitheatre for musical concerts",
          type: "commercial"
        },
        {
          name: "Center & Promenade",
          pastStatus: "Traditional Victorian bandstand surrounded by rose gardens",
          presentStatus: "Removed and paved to create an open central plaza with café terrace",
          type: "commercial"
        },
        {
          name: "Southwestern Corner",
          pastStatus: "Glass greenhouse for exotic floral exhibitions",
          presentStatus: "Converted into a dedicated children's play playground with soft matting",
          type: "nature"
        },
        {
          name: "Southeastern Corner",
          pastStatus: "Decorative pond with aquatic water lilies",
          presentStatus: "Upgraded with a modern enclosed water play park for families",
          type: "nature"
        },
        {
          name: "Perimeter & Parking",
          pastStatus: "Enclosed perimeter fencing with only two pedestrian iron gates",
          presentStatus: "Retained trees, opened extra entrances, and constructed an underground car park",
          type: "transport"
        }
      ]
    },
    overview: "Overall, Grange Park has transformed from a formal, decorative Victorian garden into a vibrant recreational civic destination featuring performance spaces, family amenities, and contemporary dining.",
    sampleAnswerBand8: "The architectural maps depict the spatial changes that have occurred within Grange Park between its inauguration in 1920 and its modern configuration today.\n\nOverall, Grange Park has transformed from a formal, decorative Victorian garden into a vibrant recreational civic destination featuring performance spaces, family amenities, and contemporary dining.\n\nIn 1920, the northern sector featured an ornate fountain surrounded by formal seating. Today, this fountain has been completely replaced by an amphitheatre tailored for open-air concerts. Furthermore, the historic music bandstand that once occupied the park's central focal point has been replaced with a spacious cafe and dining patio.\n\nChanges in the southern sections reflect a shift toward child-friendly recreation. The vintage glasshouse in the southwest quadrant has made way for a modern children's playground. Similarly, the decorative pond in the southeast has been transformed into a family water play zone. Finally, while the peripheral rose gardens were cleared, a new underground parking facility has been added on the eastern boundary to accommodate motorized visitors.",
    keyVocabulary: [
      { word: "ornate fountain", meaning: "đài phun nước chạm trổ hoa văn tinh xảo" },
      { word: "recreational civic destination", meaning: "điểm đến sinh hoạt cộng đồng và giải trí" },
      { word: "inauguration", meaning: "lễ khánh thành, mở cửa ban đầu" },
      { word: "contemporary dining patio", meaning: "hiên ăn uống ngoài trời hiện đại" }
    ],
    wordCount: 198,
    bandScore: "8.5"
  },
  {
    id: 23,
    title: "[Cambridge 14 - Test 3] National Export Revenue Trends Across Five Sectors (2015-2016)",
    chartType: "bar",
    category: "Economics & Export Trade",
    prompt: "The chart below shows the value of one country's exports in various categories in 2015 and 2016. The table shows the percentage change in each category of exports in 2016 compared with 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Export Sector",
      yAxisTitle: "Revenue ($ Billions)",
      unit: "$ Billions",
      categories: ["Petroleum Products", "Engineered Goods", "Gems & Jewellery", "Agricultural Products", "Textiles"],
      series: [
        {
          label: "2015 Exports ($bn)",
          color: "#3b82f6",
          data: [
            { name: "Petroleum", value: 61.2 },
            { name: "Engineered", value: 57.5 },
            { name: "Gems", value: 42.5 },
            { name: "Agricultural", value: 31.0 },
            { name: "Textiles", value: 26.0 }
          ]
        },
        {
          label: "2016 Exports ($bn)",
          color: "#10b981",
          data: [
            { name: "Petroleum", value: 63.0 },
            { name: "Engineered", value: 62.0 },
            { name: "Gems", value: 40.2 },
            { name: "Agricultural", value: 31.2 },
            { name: "Textiles", value: 30.0 }
          ]
        }
      ]
    },
    overview: "Overall, total export revenues expanded across four of the five industrial sectors between 2015 and 2016, with gems and jewellery being the sole industry experiencing a contraction. Petroleum and engineered goods consistently generated the highest financial receipts.",
    sampleAnswerBand8: "The bar chart and associated dataset delineate export earnings across five major industrial divisions in an unnamed country during 2015 and 2016, quantified in billions of US dollars.\n\nOverall, total export revenues expanded across four of the five industrial sectors between 2015 and 2016, with gems and jewellery being the sole industry experiencing a contraction. Petroleum and engineered goods consistently generated the highest financial receipts.\n\nPetroleum products constituted the foremost source of national export earnings, advancing marginally from $61.2 billion in 2015 to $63.0 billion in 2016 (a 3.0% rise). Engineered goods recorded the second highest volume and experienced rapid expansion, climbing from $57.5 billion to $62.0 billion, an increase of roughly 8.5%.\n\nIn the remaining industries, gems and jewellery dropped from $42.5 billion to $40.2 billion, representing a 5.4% decline. In contrast, textile exports surged by a substantial 15.24%, escalating from $26.0 billion to $30.0 billion. Agricultural exports demonstrated modest stagnation, nudging up from $31.0 billion to $31.2 billion, which was an increment of under 1%.",
    keyVocabulary: [
      { word: "foremost source", meaning: "nguồn thu nhập hàng đầu" },
      { word: "sole industry experiencing a contraction", meaning: "ngành duy nhất chịu sự sụt giảm" },
      { word: "surged by a substantial", meaning: "tăng vọt với tỷ lệ ấn tượng" },
      { word: "modest stagnation", meaning: "sự chững lại, đi ngang nhẹ" }
    ],
    wordCount: 194,
    bandScore: "8.5"
  },
  {
    id: 24,
    title: "[Cambridge 14 - Test 4] Electricity Generation in a Hydroelectric Power Plant",
    chartType: "process",
    category: "Renewable Energy & Engineering",
    prompt: "The diagram below shows how electricity is generated in a hydroelectric power station. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "River Inflow & High Reservoir",
          description: "River water flows downstream into a high mountain storage reservoir retained by a high dam.",
          icon: "🏞️"
        },
        {
          stepNumber: 2,
          title: "Intake Valve Control",
          description: "Intake gates open to release water from the reservoir during peak electrical demand periods.",
          icon: "🚰"
        },
        {
          stepNumber: 3,
          title: "Penstock Gravitational Flow",
          description: "Water plunges down an angled penstock pipe at high velocity under gravitational pressure.",
          icon: "🌊"
        },
        {
          stepNumber: 4,
          title: "Turbine Rotation",
          description: "High-pressure water strikes the turbine runner blades, spinning the shaft at rapid speed.",
          icon: "⚙️"
        },
        {
          stepNumber: 5,
          title: "Generator & Grid Transmission",
          description: "Spun mechanical energy drives electromagnetic coils in the generator, transmitting electricity to the national grid.",
          icon: "⚡"
        },
        {
          stepNumber: 6,
          title: "Low Reservoir Collection",
          description: "Discharged water exits the powerhouse and collects in a lower holding reservoir.",
          icon: "💧"
        },
        {
          stepNumber: 7,
          title: "Reversible Pumping Cycle",
          description: "During off-peak night hours, the generator acts as a pump, cycling water back to the high reservoir.",
          icon: "🔄"
        }
      ]
    },
    overview: "Overall, electricity generation via pumped-storage hydro is a cyclical operation that leverages gravitational water flow to drive electrical turbines by day, and reverses direction during low-demand night hours to replenish the upper reservoir.",
    sampleAnswerBand8: "The structural diagram illustrates the operational mechanism by which electricity is produced in a pumped-storage hydroelectric power station.\n\nOverall, electricity generation via pumped-storage hydro is a cyclical operation that leverages gravitational water flow to drive electrical turbines by day, and reverses direction during low-demand night hours to replenish the upper reservoir.\n\nThe process begins in a high-elevation reservoir where natural river water is held behind a concrete dam wall. During daylight hours, an intake gate is opened, allowing large volumes of water to plummet down a steep aqueduct pipe known as a penstock. As the water descends under gravitational acceleration, it achieves immense hydraulic kinetic energy.\n\nUpon entering the subterranean powerhouse, this rushing torrent strikes the blades of an industrial turbine, causing it to spin vigorously. The turbine is connected by a driveshaft to an electrical generator, which converts kinetic energy into electrical currents. This power is subsequently stepped up by transformers and fed into the national transmission grid. After driving the turbine, the discharge water collects in a lower reservoir. Crucially, during off-peak nighttime hours, electricity is reversed through the system to pump water from the lower basin back up into the high reservoir, resetting the hydraulic cycle for the following day.",
    keyVocabulary: [
      { word: "cyclical operation", meaning: "hoạt động mang tính chu kỳ tuần hoàn" },
      { word: "gravitational acceleration", meaning: "gia tốc trọng trường" },
      { word: "subterranean powerhouse", meaning: "nhà máy phát điện ngầm dưới lòng đất" },
      { word: "replenish the upper reservoir", meaning: "làm đầy lại hồ chứa phía trên" }
    ],
    wordCount: 226,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 13 ====================
  {
    id: 25,
    title: "[Cambridge 13 - Test 1] Road Access Redevelopment to City Hospital (2007 vs 2010)",
    chartType: "map",
    category: "Traffic Management & Healthcare Infrastructure",
    prompt: "The two maps below show the road access to a city hospital in 2007 and in 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Hospital Road Intersections",
          pastStatus: "Two traditional T-junctions connecting Hospital Road to City Road",
          presentStatus: "Replaced by two dual-lane roundabouts to prevent intersection congestion",
          type: "transport"
        },
        {
          name: "Bus Infrastructure",
          pastStatus: "Bus stops positioned directly alongside Hospital Road kerbside",
          presentStatus: "Constructed an independent multi-bay bus station off the western roundabout",
          type: "transport"
        },
        {
          name: "Public Parking",
          pastStatus: "Shared mixed parking facility for both staff and visiting public",
          presentStatus: "Segregated: eastern car park dedicated exclusively to the general public",
          type: "transport"
        },
        {
          name: "Staff Parking",
          pastStatus: "Staff competed for spaces in the joint lot",
          presentStatus: "Constructed dedicated secure staff-only car park in the southeastern corner",
          type: "commercial"
        }
      ]
    },
    overview: "Overall, the road network underwent substantial modernization to eliminate traffic bottlenecks. This was achieved by introducing two roundabouts, creating a dedicated bus terminal, and segregating public and hospital staff parking.",
    sampleAnswerBand8: "The maps chronicle the infrastructural enhancements made to the vehicular access routes servicing a municipal hospital between 2007 and 2010.\n\nOverall, the road network underwent substantial modernization to eliminate traffic bottlenecks. This was achieved by introducing two roundabouts, creating a dedicated bus terminal, and segregating public and hospital staff parking.\n\nIn 2007, access was governed by a single thoroughfare, Hospital Road, which connected directly to City Road via standard T-junctions. By 2010, these hazardous junctions were converted into two modern roundabouts to smoothen vehicular ingress and egress. Furthermore, the curbside bus stops that previously blocked Hospital Road were removed; in their place, a centralized bus station was constructed just west of the road, linked directly to the southern roundabout.\n\nParking facilities also underwent thorough segregation. In 2007, a singular parking area east of Hospital Road served both hospital personnel and public visitors. In 2010, this original facility was designated solely for public parking, while a brand-new, segregated car park was built on the southeastern perimeter exclusively for hospital staff, accessed via a dedicated spur road branching off the northern roundabout.",
    keyVocabulary: [
      { word: "eliminate traffic bottlenecks", meaning: "xóa bỏ các điểm nghẽn ùn tắc giao thông" },
      { word: "smoothen vehicular ingress and egress", meaning: "giúp xe cộ ra vào trơn tru hơn" },
      { word: "thorough segregation", meaning: "sự phân tách rạch ròi, triệt để" },
      { word: "dedicated spur road", meaning: "tuyến đường nhánh chuyên dụng" }
    ],
    wordCount: 204,
    bandScore: "8.5"
  },
  {
    id: 26,
    title: "[Cambridge 13 - Test 2] Housing Tenure: Owned vs Rented Homes in England & Wales (1918-2011)",
    chartType: "bar",
    category: "Housing & Demographics",
    prompt: "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Year",
      yAxisTitle: "% of Households",
      unit: "%",
      categories: ["1918", "1939", "1953", "1971", "1991", "2001", "2011"],
      series: [
        {
          label: "Owned Accommodation",
          color: "#3b82f6",
          data: [
            { name: "1918", value: 23 },
            { name: "1939", value: 31 },
            { name: "1953", value: 31 },
            { name: "1971", value: 50 },
            { name: "1991", value: 67 },
            { name: "2001", value: 69 },
            { name: "2011", value: 64 }
          ]
        },
        {
          label: "Rented Accommodation",
          color: "#ef4444",
          data: [
            { name: "1918", value: 77 },
            { name: "1939", value: 69 },
            { name: "1953", value: 69 },
            { name: "1971", value: 50 },
            { name: "1991", value: 33 },
            { name: "2001", value: 31 },
            { name: "2011", value: 36 }
          ]
        }
      ]
    },
    overview: "Overall, home ownership in England and Wales experienced steady, massive expansion over the twentieth century, overtaking tenancy in 1971. Although ownership peaked in 2001 at nearly 70%, rental housing witnessed a noticeable resurgence during the final decade.",
    sampleAnswerBand8: "The bar chart tracks the shifts in residential tenure throughout England and Wales over a near-century duration from 1918 to 2011, comparing owner-occupied properties with rented dwellings.\n\nOverall, home ownership in England and Wales experienced steady, massive expansion over the twentieth century, overtaking tenancy in 1971. Although ownership peaked in 2001 at nearly 70%, rental housing witnessed a noticeable resurgence during the final decade.\n\nIn 1918, renting was overwhelmingly the societal norm, comprising 77% of all households, while private homeownership accounted for merely 23%. Over the following five decades, homeownership expanded steadily, achieving parity with tenancy at exactly 50% apiece in 1971. The homeownership trend continued to climb sharply into the late twentieth century, reaching 67% in 1991 and peaking at a high of 69% in 2001.\n\nConversely, rental proportions contracted in inverse symmetry, bottoming out at 31% in 2001. However, the period between 2001 and 2011 witnessed a reversal in fortunes: the homeownership rate receded to 64%, while the proportion of families renting accommodation rebounded by five percentage points to finish at 36%.",
    keyVocabulary: [
      { word: "residential tenure", meaning: "hình thức sở hữu nhà ở" },
      { word: "achieving parity with", meaning: "đạt mức ngang bằng (50-50)" },
      { word: "bottoming out at", meaning: "chạm đáy ở mức" },
      { word: "reversal in fortunes", meaning: "sự đảo chiều tình thế" }
    ],
    wordCount: 196,
    bandScore: "8.5"
  },
  {
    id: 27,
    title: "[Cambridge 13 - Test 3] Public Investment in Healthcare, Education & Transport in Five Countries",
    chartType: "bar",
    category: "Government Policy & Public Finance",
    prompt: "The bar chart below shows government expenditure on healthcare, education, and transport in five countries in 2016. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Country",
      yAxisTitle: "% of Total Government Budget",
      unit: "%",
      categories: ["Germany", "UK", "Japan", "Canada", "Australia"],
      series: [
        {
          label: "Healthcare Expenditure",
          color: "#ec4899",
          data: [
            { name: "Germany", value: 21 },
            { name: "UK", value: 18 },
            { name: "Japan", value: 19 },
            { name: "Canada", value: 20 },
            { name: "Australia", value: 17 }
          ]
        },
        {
          label: "Education Expenditure",
          color: "#3b82f6",
          data: [
            { name: "Germany", value: 14 },
            { name: "UK", value: 16 },
            { name: "Japan", value: 11 },
            { name: "Canada", value: 15 },
            { name: "Australia", value: 15 }
          ]
        },
        {
          label: "Transport Expenditure",
          color: "#f59e0b",
          data: [
            { name: "Germany", value: 6 },
            { name: "UK", value: 5 },
            { name: "Japan", value: 8 },
            { name: "Canada", value: 6 },
            { name: "Australia", value: 7 }
          ]
        }
      ]
    },
    overview: "Overall, healthcare commanded the largest proportion of government budgets across all five nations, followed consistently by education, while transport received by far the smallest fiscal allocation in every country surveyed.",
    sampleAnswerBand8: "The comparative bar chart demonstrates the proportion of national government expenditures dedicated to three public sectors—healthcare, education, and transport—across five industrialized nations (Germany, the United Kingdom, Japan, Canada, and Australia) in 2016.\n\nOverall, healthcare commanded the largest proportion of government budgets across all five nations, followed consistently by education, while transport received by far the smallest fiscal allocation in every country surveyed.\n\nIn terms of healthcare outlays, Germany allocated the highest proportion of its state budget at 21%, followed very closely by Canada at 20% and Japan at 19%. The United Kingdom committed 18% of its resources to public health, while Australia registered the lowest allocation in this sector at 17%.\n\nFor education, the UK stood out with the largest dedication at 16%, narrowly outstripping Canada and Australia, which both recorded 15%. Germany invested 14% in schools and universities, whereas Japan dedicated only 11% of public funds to education. Finally, transport remained the lowest priority universally, fluctuating within a narrow band between 5% (UK) and 8% (Japan).",
    keyVocabulary: [
      { word: "commanded the largest proportion", meaning: "chiếm tỷ trọng lớn nhất" },
      { word: "fiscal allocation", meaning: "sự phân bổ ngân sách tài khóa" },
      { word: "narrowly outstripping", meaning: "vượt qua trong gang tấc" },
      { word: "lowest priority universally", meaning: "ưu tiên thấp nhất ở mọi quốc gia" }
    ],
    wordCount: 190,
    bandScore: "8.5"
  },
  {
    id: 28,
    title: "[Cambridge 13 - Test 4] University Sports Centre Modernisation Plan",
    chartType: "map",
    category: "Campus Planning & Sports Infrastructure",
    prompt: "The plans below show the layout of a university sports centre now and how it will look after planned redevelopment. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Outdoor Courts & Pool",
          pastStatus: "Two open-air outdoor grass tennis courts on eastern perimeter",
          presentStatus: "Courts demolished to construct a 50m Olympic indoor swimming pool",
          type: "nature"
        },
        {
          name: "Central Gym & Facilities",
          pastStatus: "Compact central gym hall and changing rooms",
          presentStatus: "Gym enlarged threefold to include high-tech cardio machines & sauna",
          type: "commercial"
        },
        {
          name: "Western Expansion",
          pastStatus: "Vacant lawn grounds",
          presentStatus: "Constructed dedicated dance studio, climbing wall, and sports shop",
          type: "commercial"
        },
        {
          name: "Reception & Hospitality",
          pastStatus: "Small reception desk at entrance foyer",
          presentStatus: "Extended foyer featuring health juice café, sports merchandise shop & lounge",
          type: "commercial"
        }
      ]
    },
    overview: "Overall, the university sports centre will undergo extensive eastern and western lateral expansions, transforming from a basic athletic building into a comprehensive multi-discipline indoor fitness complex.",
    sampleAnswerBand8: "The architectural drawings illustrate the contemporary blueprint of a university sports complex alongside proposed refurbishment plans scheduled for implementation.\n\nOverall, the university sports centre will undergo extensive eastern and western lateral expansions, transforming from a basic athletic building into a comprehensive multi-discipline indoor fitness complex.\n\nAt present, the complex consists of a central 25m swimming pool, flanked by changing amenities and a modest gymnasium, with two outdoor grass courts on the eastern boundary and undeveloped lawns to the west. Under the redevelopment proposal, the existing pool will be retained, but the outdoor courts will be dismantled to erect a massive new leisure pool accompanied by two indoor sports halls.\n\nSimultaneously, the western lawn will be built upon, housing a brand-new leisure dance studio and a climbing wall facility. The central gym will be enlarged toward the north to accommodate state-of-the-art weights and conditioning zones. Finally, the main entrance foyer will be significantly enhanced to incorporate a sports gear boutique and a wellness juice café.",
    keyVocabulary: [
      { word: "lateral expansions", meaning: "sự mở rộng sang hai cánh bên" },
      { word: "multi-discipline fitness complex", meaning: "khu phức hợp thể thao đa bộ môn" },
      { word: "proposed refurbishment", meaning: "kế hoạch tân trang được đề xuất" },
      { word: "state-of-the-art conditioning zones", meaning: "khu vực tập thể lực tối tân" }
    ],
    wordCount: 195,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 12 ====================
  {
    id: 29,
    title: "[Cambridge 12 - Test 1] Regular Physical Exercise by Gender & Age in Australia (2010)",
    chartType: "bar",
    category: "Health, Fitness & Demographics",
    prompt: "The chart below shows the percentage of Australian men and women in different age groups who did regular physical activity in 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Age Bracket",
      yAxisTitle: "% of Cohort Exercising",
      unit: "%",
      categories: ["15 to 24", "25 to 34", "35 to 44", "45 to 54", "55 to 64", "65 and over"],
      series: [
        {
          label: "Men (%)",
          color: "#3b82f6",
          data: [
            { name: "15-24", value: 52.8 },
            { name: "25-34", value: 42.2 },
            { name: "35-44", value: 39.5 },
            { name: "45-54", value: 43.1 },
            { name: "55-64", value: 45.1 },
            { name: "65+", value: 46.7 }
          ]
        },
        {
          label: "Women (%)",
          color: "#ec4899",
          data: [
            { name: "15-24", value: 47.7 },
            { name: "25-34", value: 48.9 },
            { name: "35-44", value: 52.5 },
            { name: "45-54", value: 53.3 },
            { name: "55-64", value: 53.0 },
            { name: "65+", value: 47.1 }
          ]
        }
      ]
    },
    overview: "Overall, Australian females exercised more consistently than males across almost all demographic brackets, with the sole exception of the youngest cohort (15 to 24), where young men recorded their highest activity rates.",
    sampleAnswerBand8: "The bar chart analyzes the proportion of Australian males and females participating in routine physical activity in 2010, categorized into six progressive age brackets ranging from 15 to 65 and older.\n\nOverall, Australian females exercised more consistently than males across almost all demographic brackets, with the sole exception of the youngest cohort (15 to 24), where young men recorded their highest activity rates.\n\nAmong the youngest age cohort (15–24), males reached their highest participation level at 52.8%, visibly outpacing females at 47.7%. However, male exercise rates declined sharply in adulthood, dipping to 42.2% for those aged 25–34 and touching a nadir of 39.5% in the 35–44 category. Thereafter, male participation recovered gradually, rising through 43.1% and 45.1% to settle at 46.7% among seniors aged 65 and above.\n\nConversely, female engagement exhibited an inverse pattern, rising steadily through adulthood. Women aged 35–44 (52.5%), 45–54 (53.3%), and 55–64 (53.0%) demonstrated the greatest fitness dedication, comfortably eclipsing their male counterparts. In the 65+ demographic, rates equalized at roughly 47% for both genders.",
    keyVocabulary: [
      { word: "routine physical activity", meaning: "hoạt động thể chất đều đặn" },
      { word: "visibly outpacing", meaning: "vượt trội rõ rệt" },
      { word: "touching a nadir", meaning: "chạm điểm đáy thấp nhất" },
      { word: "rates equalized", meaning: "tỷ lệ cân bằng nhau" }
    ],
    wordCount: 198,
    bandScore: "8.5"
  },
  {
    id: 30,
    title: "[Cambridge 12 - Test 2] Town of Islip Urban Development and Bypass Plan",
    chartType: "map",
    category: "Urban Planning & Roadways",
    prompt: "The two maps below show the center of a small town called Islip as it is now, and plans for its future development. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Main Thoroughfare",
          pastStatus: "Main traffic street passing directly through town with shops on both sides",
          presentStatus: "Pedestrianized high street restricted to walking, cycling, and trees",
          type: "commercial"
        },
        {
          name: "Bypass Dual Carriageway",
          pastStatus: "No peripheral bypass; all through-traffic congested center",
          presentStatus: "Constructed dual-carriageway ring bypass around northern perimeter",
          type: "transport"
        },
        {
          name: "Northern Residential Zone",
          pastStatus: "Vacant countryside fields behind row of existing shops",
          presentStatus: "New residential housing estate, primary school, and shopping center",
          type: "residential"
        },
        {
          name: "Southern Perimeter",
          pastStatus: "Private gardens and small park area",
          presentStatus: "Park preserved and expanded; added bus terminal and park-and-ride facility",
          type: "nature"
        }
      ]
    },
    overview: "Overall, the proposed scheme will reroute transit vehicles away from the urban centre via a northern ring bypass, convert the main thoroughfare into an eco-friendly pedestrian strip, and introduce new residential and educational developments.",
    sampleAnswerBand8: "The maps illustrate the current municipal layout of Islip town centre alongside proposed infrastructural changes designed for future implementation.\n\nOverall, the proposed scheme will reroute transit vehicles away from the urban centre via a northern ring bypass, convert the main thoroughfare into an eco-friendly pedestrian strip, and introduce new residential and educational developments.\n\nCurrently, the town is divided east-west by a busy main road flanked by commercial shops, with housing situated in the southwest corner and rural fields in the north. Under the modernization plan, through-traffic will be circumvented via a newly built dual carriageway encircling the northern fringe, complete with roundabouts connecting to peripheral routes.\n\nConsequently, the central road will be pedestrianized, banning motor vehicles. While the southern retail shops will remain untouched, the northern row of shops will be dismantled to establish a large new residential housing estate. Furthermore, a new primary school and bus station will be introduced to serve the growing populace.",
    keyVocabulary: [
      { word: "reroute transit vehicles", meaning: "chuyển hướng lưu thông phương tiện" },
      { word: "pedestrianized high street", meaning: "tuyến phố chính dành riêng cho người đi bộ" },
      { word: "circumvented via", meaning: "được đi vòng tránh thông qua" },
      { word: "peripheral fringe", meaning: "vành đai rìa ngoại ô" }
    ],
    wordCount: 188,
    bandScore: "8.5"
  },
  {
    id: 31,
    title: "[Cambridge 12 - Test 3] Fast Food Consumption Frequency Among Americans (2003-2013)",
    chartType: "bar",
    category: "Public Health & Eating Habits",
    prompt: "The bar chart below shows the frequency with which people in the USA ate in fast food restaurants between 2003 and 2013. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Frequency Bracket",
      yAxisTitle: "% of US Population",
      unit: "%",
      categories: ["Everyday", "Several times a week", "Once a week", "Once or twice a month", "A few times a year", "Never"],
      series: [
        {
          label: "2003",
          color: "#ef4444",
          data: [
            { name: "Everyday", value: 4 },
            { name: "Several times/wk", value: 17 },
            { name: "Once a week", value: 31 },
            { name: "Once/twice a month", value: 30 },
            { name: "Few times a year", value: 13 },
            { name: "Never", value: 5 }
          ]
        },
        {
          label: "2006",
          color: "#f59e0b",
          data: [
            { name: "Everyday", value: 3 },
            { name: "Several times/wk", value: 20 },
            { name: "Once a week", value: 33 },
            { name: "Once/twice a month", value: 25 },
            { name: "Few times a year", value: 15 },
            { name: "Never", value: 4 }
          ]
        },
        {
          label: "2013",
          color: "#10b981",
          data: [
            { name: "Everyday", value: 3 },
            { name: "Several times/wk", value: 16 },
            { name: "Once a week", value: 27 },
            { name: "Once/twice a month", value: 33 },
            { name: "Few times a year", value: 15 },
            { name: "Never", value: 4 }
          ]
        }
      ]
    },
    overview: "Overall, eating fast food once a week or once/twice a month represented the overwhelming norm for Americans across all three years. Extreme habits (consuming fast food daily or never eating it) remained marginal at 5% or under.",
    sampleAnswerBand8: "The bar chart surveys the frequency with which US citizens patronized fast food establishments across three distinct years: 2003, 2006, and 2013.\n\nOverall, eating fast food once a week or once/twice a month represented the overwhelming norm for Americans across all three years. Extreme habits (consuming fast food daily or never eating it) remained marginal at 5% or under.\n\nIn 2003, dining at fast food venues once weekly was the leading response at 31%, peaking slightly at 33% in 2006 before subsiding to 27% by 2013. In contrast, those indulging once or twice monthly started at 30%, dipped to 25% in 2006, and rebounded to become the single most popular category at 33% in 2013.\n\nRegarding the remaining categories, respondents eating fast food several times weekly hovered between 16% and 20%. Those patronizing fast food outlets only a few times a year represented 13% in 2003 and settled at 15% in subsequent years. Finally, the extreme cohorts at either end of the spectrum—daily consumers (3%–4%) and complete abstainers (4%–5%)—accounted for negligible percentages throughout the decade.",
    keyVocabulary: [
      { word: "patronized fast food establishments", meaning: "lui tới, ăn uống tại các chuỗi đồ ăn nhanh" },
      { word: "overwhelming norm", meaning: "quy chuẩn, thói quen áp đảo" },
      { word: "extreme cohorts", meaning: "các nhóm phân khúc cực đoan (quá nhiều hoặc không bao giờ)" },
      { word: "negligible percentages", meaning: "tỷ lệ không đáng kể" }
    ],
    wordCount: 195,
    bandScore: "8.5"
  },
  {
    id: 32,
    title: "[Cambridge 12 - Test 4] Grange Park Public Grounds Comparison (1920 vs Present)",
    chartType: "map",
    category: "Landscape Architecture & Heritage",
    prompt: "The maps below show the changes that have taken place in Grange Park from 1920 to the present day. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "map",
      mapLocations: [
        {
          name: "Amphitheatre & Stage",
          pastStatus: "Central Victorian stage for live band music",
          presentStatus: "Converted into a modern amphitheatre for concerts and festivals",
          type: "commercial"
        },
        {
          name: "Rose Gardens",
          pastStatus: "Formal symmetrical flowerbeds along paths",
          presentStatus: "Concentrated into a compact aromatic rose garden with park benches",
          type: "nature"
        },
        {
          name: "Hospitality Café",
          pastStatus: "No food or drink facilities existed",
          presentStatus: "Modern brick-built public café with open-air terrace seating",
          type: "commercial"
        },
        {
          name: "Children Play Area",
          pastStatus: "Restricted grass lawn",
          presentStatus: "Enclosed adventure playground with timber climbing frames",
          type: "nature"
        }
      ]
    },
    overview: "Overall, Grange Park has transformed from a formal, quiet ornamental garden in 1920 into a multi-functional modern community hub focused on public entertainment, children's play, and dining.",
    sampleAnswerBand8: "The two maps document the architectural and functional evolution of Grange Park from its original layout in 1920 to its present-day configuration.\n\nOverall, Grange Park has transformed from a formal, quiet ornamental garden in 1920 into a multi-functional modern community hub focused on public entertainment, children's play, and dining.\n\nIn 1920, the park was oriented toward quiet contemplation, dominated by two large rose gardens flanking a central bandstand, along with an ornate fountain to the north. Today, the bandstand has been replaced by an amphitheatre for musical events, while the old fountain has been converted into a spacious café.\n\nTo the south, the glasshouse and water garden have been removed to make way for modern family amenities, specifically an adventure playground and a water splash pad. Access has also improved, with the addition of an underground car park accessed from the eastern edge.",
    keyVocabulary: [
      { word: "ornamental garden", meaning: "vườn hoa cảnh quan trang trí" },
      { word: "quiet contemplation", meaning: "sự thư thái, tĩnh lặng" },
      { word: "adventure playground", meaning: "sân chơi thám hiểm cho trẻ em" },
      { word: "functional evolution", meaning: "sự phát triển tiến hóa về mặt công năng" }
    ],
    wordCount: 180,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 11 ====================
  {
    id: 33,
    title: "[Cambridge 11 - Test 1] Global Water Consumption by Sector in Six World Regions",
    chartType: "pie",
    category: "Natural Resources, Water & Environment",
    prompt: "The charts below show the percentage of water used for different purposes in six areas of the world. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "pie",
      series: [
        {
          label: "North America",
          data: [
            { name: "Industrial", value: 48 },
            { name: "Agricultural", value: 39 },
            { name: "Domestic", value: 13 }
          ]
        },
        {
          label: "Europe",
          data: [
            { name: "Industrial", value: 53 },
            { name: "Agricultural", value: 32 },
            { name: "Domestic", value: 15 }
          ]
        },
        {
          label: "South America",
          data: [
            { name: "Agricultural", value: 71 },
            { name: "Domestic", value: 19 },
            { name: "Industrial", value: 10 }
          ]
        },
        {
          label: "Africa",
          data: [
            { name: "Agricultural", value: 84 },
            { name: "Domestic", value: 9 },
            { name: "Industrial", value: 7 }
          ]
        },
        {
          label: "Central Asia",
          data: [
            { name: "Agricultural", value: 88 },
            { name: "Domestic", value: 7 },
            { name: "Industrial", value: 5 }
          ]
        },
        {
          label: "South East Asia",
          data: [
            { name: "Agricultural", value: 81 },
            { name: "Domestic", value: 12 },
            { name: "Industrial", value: 7 }
          ]
        }
      ]
    },
    overview: "Overall, agricultural irrigation absorbed the vast majority of water across developing regions (Africa, Central Asia, South East Asia, and South America). Conversely, industrial requirements consumed the largest share of water in North America and Europe.",
    sampleAnswerBand8: "The pie charts illustrate the sectoral distribution of freshwater consumption across three primary categories—agricultural, industrial, and domestic—in six diverse continental regions of the globe.\n\nOverall, agricultural irrigation absorbed the vast majority of water across developing regions (Africa, Central Asia, South East Asia, and South America). Conversely, industrial requirements consumed the largest share of water in North America and Europe.\n\nIn Central Asia, Africa, and South East Asia, farming was overwhelmingly dominant, claiming 88%, 84%, and 81% of regional water supplies respectively. South America exhibited a comparable agrarian emphasis, allocating 71% to agriculture. In sharp contrast, domestic usage across these four regions was limited, fluctuating between 7% and 19%, while industrial sectors drew a meager 5% to 10%.\n\nA fundamentally distinct consumption profile existed in North America and Europe. Industrial operations formed the foremost demand, absorbing 48% of total water in North America and 53% in Europe. Agriculture claimed only 39% and 32% respectively, while domestic municipal requirements accounted for modest shares of 13% and 15%.",
    keyVocabulary: [
      { word: "sectoral distribution", meaning: "sự phân bổ theo các ngành kinh tế" },
      { word: "agricultural irrigation", meaning: "tưới tiêu phục vụ nông nghiệp" },
      { word: "agrarian emphasis", meaning: "sự tập trung chủ yếu vào nông nghiệp" },
      { word: "fundamentally distinct profile", meaning: "hồ sơ đặc điểm khác biệt căn bản" }
    ],
    wordCount: 196,
    bandScore: "8.5"
  },
  {
    id: 34,
    title: "[Cambridge 11 - Test 2] Foreign Language Capabilities of British Undergraduates (2000 vs 2010)",
    chartType: "pie",
    category: "Linguistics & Tertiary Education",
    prompt: "The charts below show the proportions of British students at one university in England who were able to speak other languages in addition to English in 2000 and 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "pie",
      series: [
        {
          label: "Language Skills in 2000",
          data: [
            { name: "Spanish Only", value: 30 },
            { name: "No Other Language", value: 20 },
            { name: "French Only", value: 15 },
            { name: "Another Language", value: 15 },
            { name: "German Only", value: 10 },
            { name: "Two Other Languages", value: 10 }
          ]
        },
        {
          label: "Language Skills in 2010",
          data: [
            { name: "Spanish Only", value: 35 },
            { name: "Another Language", value: 20 },
            { name: "Two Other Languages", value: 15 },
            { name: "French Only", value: 10 },
            { name: "German Only", value: 10 },
            { name: "No Other Language", value: 10 }
          ]
        }
      ]
    },
    overview: "Overall, the proportion of multilingual students increased noticeably over the decade, with monolingual English-only speakers halving by 2010. Spanish solidified its standing as the most popular single foreign language.",
    sampleAnswerBand8: "The pie charts detail the linguistic proficiencies of British undergraduate students at a single English university across a 10-year period, comparing records from 2000 and 2010.\n\nOverall, the proportion of multilingual students increased noticeably over the decade, with monolingual English-only speakers halving by 2010. Spanish solidified its standing as the most popular single foreign language.\n\nIn 2000, students proficient only in Spanish represented 30% of the cohort. By 2010, this segment expanded to 35%, remaining the most prominent foreign tongue. Similarly, the proportion speaking other global languages rose from 15% to 20%, while polyglots capable of speaking two foreign languages expanded from 10% to 15%.\n\nConversely, students with zero foreign language skills fell sharply from 20% in 2000 to just 10% in 2010. French fluency also suffered a decline, dropping from 15% to 10%. German remained completely stationary, holding steady at 10% across both survey benchmarks.",
    keyVocabulary: [
      { word: "multilingual students", meaning: "các sinh viên biết đa ngôn ngữ" },
      { word: "monolingual English-only speakers", meaning: "những người chỉ nói một thứ tiếng Anh duy nhất" },
      { word: "solidified its standing", meaning: "củng cố vị thế vững chắc" },
      { word: "completely stationary", meaning: "hoàn toàn giữ nguyên, đứng yên" }
    ],
    wordCount: 184,
    bandScore: "8.5"
  },
  {
    id: 35,
    title: "[Cambridge 11 - Test 3] Charitable Giving by Age Demographics in the UK (1990 vs 2010)",
    chartType: "bar",
    category: "Philanthropy, Society & Ageing",
    prompt: "The chart below shows the percentage of British people giving money to charity by age range for the years 1990 and 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "bar",
      xAxisTitle: "Age Range",
      yAxisTitle: "% of Cohort Donating",
      unit: "%",
      categories: ["18 to 25", "26 to 35", "36 to 50", "51 to 65", "Over 65"],
      series: [
        {
          label: "1990",
          color: "#3b82f6",
          data: [
            { name: "18-25", value: 17 },
            { name: "26-35", value: 31 },
            { name: "36-50", value: 42 },
            { name: "51-65", value: 35 },
            { name: "Over 65", value: 32 }
          ]
        },
        {
          label: "2010",
          color: "#ec4899",
          data: [
            { name: "18-25", value: 7 },
            { name: "26-35", value: 24 },
            { name: "36-50", value: 35 },
            { name: "51-65", value: 39 },
            { name: "Over 65", value: 35 }
          ]
        }
      ]
    },
    overview: "Overall, charitable donations declined among younger and middle-aged adults, whereas older citizens aged 51 and over increased their philanthropic contributions, becoming the most generous segment by 2010.",
    sampleAnswerBand8: "The bar chart compares the proportion of British citizens contributing financially to philanthropic causes across five distinct age brackets in 1990 and 2010.\n\nOverall, charitable donations declined among younger and middle-aged adults, whereas older citizens aged 51 and over increased their philanthropic contributions, becoming the most generous segment by 2010.\n\nIn 1990, middle-aged adults aged 36 to 50 formed the most generous demographic, with 42% giving to charity. However, by 2010, this figure receded to 35%. A steeper drop was recorded among youths: donors aged 18 to 25 plummeted from 17% to a mere 7%, while donors aged 26 to 35 slid from 31% to 24%.\n\nIn marked contrast, older cohorts demonstrated ascending philanthropic engagement. Contributions among 51- to 65-year-olds expanded from 35% in 1990 to 39% in 2010, making them the most benevolent age group. Similarly, seniors aged over 65 increased their participation from 32% to 35%.",
    keyVocabulary: [
      { word: "philanthropic causes", meaning: "các mục đích nhân đạo, từ thiện" },
      { word: "generous demographic", meaning: "nhóm dân số hào phóng, đóng góp nhiều" },
      { word: "steep drop", meaning: "sự sụt giảm mạnh mẽ" },
      { word: "benevolent age group", meaning: "nhóm độ tuổi có lòng nhân ái cao nhất" }
    ],
    wordCount: 185,
    bandScore: "8.5"
  },
  {
    id: 36,
    title: "[Cambridge 11 - Test 4] Global Urban Underground Railway Networks Comparison",
    chartType: "table",
    category: "Public Transit, Megacities & Transport",
    prompt: "The table below gives information about the underground railway systems in six cities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "table",
      tableHeaders: ["City Network", "Year Opened", "Kilometres of Route", "Passengers / Year (Millions)"],
      tableRows: [
        ["London Underground", "1863", "394 km", "775 million"],
        ["Paris Métro", "1900", "199 km", "1,191 million"],
        ["Tokyo Subway", "1927", "155 km", "1,927 million"],
        ["Washington DC Metro", "1976", "126 km", "144 million"],
        ["Kyoto Municipal Subway", "1981", "11 km", "45 million"],
        ["Los Angeles Metro Rail", "1993", "28 km", "50 million"]
      ]
    },
    overview: "Overall, the older European and Asian systems established before 1930 boast far greater track lengths and carry exponentially more passengers than the newer American and Japanese networks constructed in the late 20th century.",
    sampleAnswerBand8: "The comparative data table evaluates operational metrics across six municipal underground rail transit networks worldwide, contrasting inauguration years, total route coverage in kilometres, and annual ridership volume in millions.\n\nOverall, the older European and Asian systems established before 1930 boast far greater track lengths and carry exponentially more passengers than the newer American and Japanese networks constructed in the late 20th century.\n\nLondon boasts the world's oldest underground system, dating back to 1863, and also operates the most extensive trackage at 394 kilometres, servicing 775 million passengers annually. Paris, inaugurating its network in 1900, provides 199 kilometres of track but achieves superior passenger traffic of nearly 1.2 billion commuters. Tokyo, operational since 1927, carries the largest ridership by far, transporting over 1.9 billion passengers annually despite operating a comparatively modest 155 km of track.\n\nIn stark contrast, modern systems constructed after 1970 exhibit dramatically smaller reach. Washington DC operates 126 km of track handling 144 million riders. Kyoto and Los Angeles operate the smallest routes, at merely 11 km and 28 km respectively, servicing 45 and 50 million commuters per year.",
    keyVocabulary: [
      { word: "ridership volume", meaning: "lượng hành khách lưu thông" },
      { word: "extensive trackage", meaning: "mạng lưới đường ray trải dài quy mô lớn" },
      { word: "superior passenger traffic", meaning: "lưu lượng hành khách vượt trội hơn" },
      { word: "stark contrast", meaning: "sự tương phản rõ rệt một trời một vực" }
    ],
    wordCount: 202,
    bandScore: "8.5"
  },

  // ==================== CAMBRIDGE 10 ====================
  {
    id: 37,
    title: "[Cambridge 10 - Test 1] Higher Education Attendance & Course Completion Trends",
    chartType: "line",
    category: "Academic Studies & University Systems",
    prompt: "The graph below shows the percentage of students completing tertiary degree courses across four subject faculties between 2000 and 2012. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Completion Rate (%)",
      unit: "%",
      categories: ["2000", "2003", "2006", "2009", "2012"],
      series: [
        {
          label: "Computer Science",
          color: "#3b82f6",
          data: [
            { name: "2000", value: 62 },
            { name: "2003", value: 68 },
            { name: "2006", value: 75 },
            { name: "2009", value: 81 },
            { name: "2012", value: 86 }
          ]
        },
        {
          label: "Business & Management",
          color: "#10b981",
          data: [
            { name: "2000", value: 70 },
            { name: "2003", value: 72 },
            { name: "2006", value: 74 },
            { name: "2009", value: 76 },
            { name: "2012", value: 78 }
          ]
        },
        {
          label: "Humanities & Arts",
          color: "#f59e0b",
          data: [
            { name: "2000", value: 55 },
            { name: "2003", value: 54 },
            { name: "2006", value: 50 },
            { name: "2009", value: 48 },
            { name: "2012", value: 45 }
          ]
        },
        {
          label: "Biological Sciences",
          color: "#ec4899",
          data: [
            { name: "2000", value: 60 },
            { name: "2003", value: 62 },
            { name: "2006", value: 63 },
            { name: "2009", value: 61 },
            { name: "2012", value: 64 }
          ]
        }
      ]
    },
    overview: "Overall, Computer Science demonstrated the most impressive graduation growth, overtaking Business Studies to record the highest completion rate by 2012. Conversely, Humanities suffered a sustained, steady contraction.",
    sampleAnswerBand8: "The line chart examines graduation success rates across four tertiary academic faculties over a 12-year window from 2000 to 2012.\n\nOverall, Computer Science demonstrated the most impressive graduation growth, overtaking Business Studies to record the highest completion rate by 2012. Conversely, Humanities suffered a sustained, steady contraction.\n\nIn 2000, Business & Management led with a graduation rate of 70%, which grew gradually to finish at 78% in 2012. However, it was surpassed by Computer Science, which opened at 62% before surging by 24 percentage points to culminate in an outstanding 86% completion rate by 2012.\n\nIn contrast, completion rates for Humanities and Arts fell steadily from 55% at the beginning of the period to a low of 45% in 2012. Biological Sciences maintained remarkable stability throughout the survey, fluctuating marginally between 60% and 64%.",
    keyVocabulary: [
      { word: "graduation success rates", meaning: "tỷ lệ sinh viên tốt nghiệp thành công" },
      { word: "sustained contraction", meaning: "sự sụt giảm kéo dài liên tục" },
      { word: "surpassing", meaning: "vượt qua mặt" },
      { word: "remarkable stability", meaning: "sự ổn định đáng kinh ngạc" }
    ],
    wordCount: 178,
    bandScore: "8.5"
  },
  {
    id: 38,
    title: "[Cambridge 10 - Test 2] Industrial & Agricultural Water Usage in Five Nations",
    chartType: "table",
    category: "Environmental Resources & Global Consumption",
    prompt: "The table below gives information on water use in five countries in 2000. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "table",
      tableHeaders: ["Country", "Population (M)", "Irrigated Land (km²)", "Water Consumption / Person (m³)"],
      tableRows: [
        ["Brazil", "176 million", "26,500 km²", "359 m³"],
        ["Democratic Republic of Congo", "52 million", "100 km²", "8 m³"],
        ["Egypt", "69 million", "33,000 km²", "1,072 m³"],
        ["Saudi Arabia", "22 million", "4,300 km²", "758 m³"],
        ["Canada", "31 million", "3,000 km²", "1,200 m³"]
      ]
    },
    overview: "Overall, Canada and Egypt documented by far the highest per capita water consumption, while the Democratic Republic of Congo recorded negligible water extraction despite a sizeable populace.",
    sampleAnswerBand8: "The table assesses water consumption metrics across five contrasting countries in the year 2000, detailing population sizes, total surface areas of irrigated farmland, and per capita water consumption measured in cubic meters.\n\nOverall, Canada and Egypt documented by far the highest per capita water consumption, while the Democratic Republic of Congo recorded negligible water extraction despite a sizeable populace.\n\nCanada consumed the highest volume of water per person at 1,200 m³, despite having a modest population of 31 million and merely 3,000 km² of irrigated agricultural land. Egypt recorded a similarly substantial per capita consumption of 1,072 m³, supported by extensive irrigation of 33,000 km² along the Nile Valley for its 69 million citizens.\n\nIn contrast, the Democratic Republic of Congo presented the starkest disparity: despite housing 52 million residents, its per capita water consumption stood at a minuscule 8 m³, reflecting a negligible 100 km² of irrigated land. Brazil possessed 26,500 km² of agricultural irrigation for 176 million people, consuming 359 m³ per head, while desert-bound Saudi Arabia recorded 758 m³ per person.",
    keyVocabulary: [
      { word: "per capita water consumption", meaning: "mức tiêu thụ nước bình quân đầu người" },
      { word: "negligible water extraction", meaning: "lượng khai thác nước không đáng kể" },
      { word: "starkest disparity", meaning: "sự chênh lệch, phân hóa rõ rệt nhất" },
      { word: "minuscule", meaning: "vô cùng nhỏ bé" }
    ],
    wordCount: 198,
    bandScore: "8.5"
  },
  {
    id: 39,
    title: "[Cambridge 10 - Test 3] The Natural Biological Life Cycle of Salmon",
    chartType: "process",
    category: "Biology, Wildlife & Nature",
    prompt: "The diagram below shows the life cycle of the salmon, from egg to adult fish. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "process",
      processSteps: [
        {
          stepNumber: 1,
          title: "Eggs in Riverbed Gravel",
          description: "Salmon eggs incubate safely under gravel beds in slow-flowing upper freshwater rivers.",
          icon: "🥚"
        },
        {
          stepNumber: 2,
          title: "Fry Emergence",
          description: "After hatching, young salmon (fry, 3-8 cm) feed on tiny river insects for up to 6 months.",
          icon: "🐟"
        },
        {
          stepNumber: 3,
          title: "Smolt Downriver Migration",
          description: "Growing into smolts (12-15 cm), they migrate downstream into open estuary waters.",
          icon: "🌊"
        },
        {
          stepNumber: 4,
          title: "Adult Ocean Feeding",
          description: "Adult salmon (70-76 cm) inhabit the open ocean for 1 to 5 years, feeding on squid and small fish.",
          icon: "🦈"
        },
        {
          stepNumber: 5,
          title: "Spawning Upstream Run",
          description: "Mature adult salmon swim upstream against powerful river currents to spawn and reproduce.",
          icon: "🏞️"
        }
      ]
    },
    overview: "Overall, the lifecycle of the salmon is a circular biological odyssey spanning freshwater rivers, estuaries, and the open ocean, characterized by dramatic morphological growth from tiny eggs to mature spawning adults.",
    sampleAnswerBand8: "The illustrated diagram details the cyclical biological lifecycle of the wild salmon, progressing through distinct aquatic habitats from incubation to reproductive maturity.\n\nOverall, the lifecycle of the salmon is a circular biological odyssey spanning freshwater rivers, estuaries, and the open ocean, characterized by dramatic morphological growth from tiny eggs to mature spawning adults.\n\nThe life cycle commences in the upper reaches of slow-moving freshwater rivers, where salmon eggs are deposited beneath sheltered riverbed gravel. After hatching, the juvenile salmon—termed 'fry'—measure merely 3 to 8 centimetres in length and spend their first five months feeding in sheltered river waters.\n\nAs the fish mature into 'smolts' (measuring 12 to 15 cm), they migrate downstream toward coastal estuaries, acclimatizing to saline conditions. Eventually, they venture out into the open ocean, where they live and feed for between one and five years, growing into full adult salmon measuring 70 to 76 cm. In the terminal phase of their cycle, adult salmon embark on an arduous upstream journey against river currents, returning to their natal breeding grounds to spawn the next generation.",
    keyVocabulary: [
      { word: "cyclical biological lifecycle", meaning: "vòng đời sinh học tuần hoàn" },
      { word: "morphological growth", meaning: "sự phát triển biến đổi về hình thái học" },
      { word: "natal breeding grounds", meaning: "nơi sinh sản chôn rau cắt rốn" },
      { word: "arduous upstream journey", meaning: "hành trình bơi ngược dòng gian nan" }
    ],
    wordCount: 204,
    bandScore: "8.5"
  },
  {
    id: 40,
    title: "[Cambridge 10 - Test 4] Cross-Border Tourism Modes & Influx in Europe",
    chartType: "line",
    category: "Tourism, Transportation & Geography",
    prompt: "The graph below shows the number of overseas visitors to three European countries between 1985 and 2005. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    chartData: {
      chartType: "line",
      xAxisTitle: "Year",
      yAxisTitle: "Visitors (Millions)",
      unit: "Million Visitors",
      categories: ["1985", "1990", "1995", "2000", "2005"],
      series: [
        {
          label: "France",
          color: "#3b82f6",
          data: [
            { name: "1985", value: 10 },
            { name: "1990", value: 20 },
            { name: "1995", value: 30 },
            { name: "2000", value: 50 },
            { name: "2005", value: 70 }
          ]
        },
        {
          label: "Spain",
          color: "#f59e0b",
          data: [
            { name: "1985", value: 8 },
            { name: "1990", value: 12 },
            { name: "1995", value: 25 },
            { name: "2000", value: 40 },
            { name: "2005", value: 55 }
          ]
        },
        {
          label: "Greece",
          color: "#10b981",
          data: [
            { name: "1985", value: 5 },
            { name: "1990", value: 8 },
            { name: "1995", value: 10 },
            { name: "2000", value: 15 },
            { name: "2005", value: 20 }
          ]
        }
      ]
    },
    overview: "Overall, all three Mediterranean destinations enjoyed substantial surges in overseas tourist arrivals over the two-decade period. France maintained its lead throughout, registering the steepest overall expansion.",
    sampleAnswerBand8: "The line graph traces the volume of international tourist arrivals across three popular European holiday destinations—France, Spain, and Greece—over a twenty-year period between 1985 and 2005.\n\nOverall, all three Mediterranean destinations enjoyed substantial surges in overseas tourist arrivals over the two-decade period. France maintained its lead throughout, registering the steepest overall expansion.\n\nIn 1985, France welcomed 10 million overseas visitors, closely followed by Spain at 8 million, while Greece hosted 5 million tourists. Over the next decade, tourist inflows accelerated dramatically across all three nations. France doubled its intake to 20 million in 1990 and surged to 30 million by 1995, before embarking on exponential growth that saw arrivals peak at 70 million by 2005.\n\nSpain exhibited an equally impressive upward trajectory, climbing from 12 million in 1990 to 25 million in 1995, eventually reaching 55 million by the conclusion of the survey. Greece, while recording more moderate growth, still managed a fourfold expansion, rising from 5 million in 1985 to conclude at 20 million in 2005.",
    keyVocabulary: [
      { word: "international tourist arrivals", meaning: "lượng du khách quốc tế đến" },
      { word: "steepest overall expansion", meaning: "sự mở rộng, tăng trưởng dốc nhất" },
      { word: "exponential growth", meaning: "sự tăng trưởng nhảy vọt" },
      { word: "fourfold expansion", meaning: "sự mở rộng gấp bốn lần" }
    ],
    wordCount: 190,
    bandScore: "8.5"
  }
];
