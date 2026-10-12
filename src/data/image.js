/**
 * ============================================================================
 * CENTRALIZED WEBSITE IMAGE & VIDEO REGISTRY — Dream City Events Gwalior
 * ============================================================================
 *
 * Add or replace your website image/video links directly inside each section
 * and state/category below. Every page and section on the website reads
 * automatically from this file:
 *
 *   1. hero          — Homepage Hero Banner (video & poster image)
 *   2. services      — Homepage "What We Do" Service Cards (8 services)
 *   3. honeymoon     — Honeymoon Packages by State / Destination
 *                      (goa, kashmir, manali, bali, maldives, dubai)
 *   4. destinations  — Destination Weddings by State / City
 *                      (goa, udaipur, jaipur, rishikesh, jaisalmer, jimCorbett)
 *   5. functions     — Project Galleries by Event Category & Function
 *                      (wedding, baby, religious)
 *   6. about         — About Us Collage & Final CTA Banner
 *   7. testimonials  — Client Testimonials & Review Spotlight Photos
 *   8. instagram     — Instagram / Stories Footer Strip
 *
 * HOW HONEYMOON & DESTINATION STATE ARRAYS WORK:
 *   - The 1st image link in each state's array is used as the Card Cover Photo
 *     on the homepage (#honeymoon and #destinations).
 *   - All image links in that state's array are displayed inside that state's
 *     dedicated Gallery Page (/honeymoon/<state> and /destinations/<state>).
 * ============================================================================
 */

export const images = {
  // ==========================================================================
  // 1. HERO SECTION (#home)
  // ==========================================================================
  hero: {
    // Background hero video link(s)
    videos: [
      'https://res.cloudinary.com/nwqljqhb/video/upload/v1791699495/15157499-hd_1920_1080_25fps_umckg8_1_eanpgz.mov',
    ],
    // Poster / cover image shown while the video loads
    poster:
      'https://res.cloudinary.com/ddelf4odl/video/upload/f_auto,q_auto,w_1280,so_0/v1791188243/15157499-hd_1920_1080_25fps_umckg8_1_eanpgz.jpg',
  },

  // ==========================================================================
  // 2. SERVICES SECTION — "What We Do" Cards (#services)
  // ==========================================================================
  services: {
    // Card 1: Wedding Planning
    weddingPlanning:
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791779209/Traditanal_Mandap.webp',

    // Card 2: Wedding Decoration
    weddingDecoration:
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',

    // Card 3: Destination Weddings
    destinationWeddings:
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791779757/download_5.webp',

    // Card 4: Birthday & Anniversary Events
    birthdayAnniversary:
      "https://res.cloudinary.com/nwqljqhb/image/upload/v1791780486/download_2.jpg",

    // Card 5: Corporate Events
    corporateEvents:
      "https://res.cloudinary.com/nwqljqhb/image/upload/v1791780592/Corporate_Award_Ceremony_Ideas___Stage_Design_Event_Production.webp",

    // Card 6: Engagement & Pre-Wedding
    engagementPreWedding:
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791780741/images.webp',

    // Card 7: Artist Management & Entertainment
    artistManagement:
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791781008/TR-HALDI-335.webp',

    // Card 8: Honeymoon Packages
    honeymoonPackages:
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791780860/honeymoon-m.webp',
  },

  // ==========================================================================
  // 3. HONEYMOON PACKAGES — BY STATE / DESTINATION (#honeymoon & /honeymoon/*)
  // Paste image links inside each state/destination array below.
  // - 1st link = Homepage Honeymoon card cover photo
  // - All links = Displayed in that state's Honeymoon Gallery page
  // ==========================================================================
  honeymoon: {
    // State / Destination 1: Goa
    goa: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
    ],

    // State / Destination 2: Kashmir
    kashmir: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/download_1_c1jc3u.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
    ],

    // State / Destination 3: Manali (Himachal Pradesh)
    manali: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
    ],

    // State / Destination 4: Bali
    bali: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
    ],

    // State / Destination 5: Maldives
    maldives: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
    ],

    // State / Destination 6: Dubai
    dubai: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
    ],
  },

  // ==========================================================================
  // 4. DESTINATION WEDDINGS — BY STATE / CITY (#destinations & /destinations/*)
  // Paste image links inside each destination array below.
  // - 1st link = Homepage Destination Wedding card cover photo
  // - All links = Displayed in that destination's Gallery page
  // ==========================================================================
  destinations: {
    // Destination 1: Goa
    goa: [
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791781572/A_Dreamy_GOA_Beach_Wedding_%EF%B8%8F__Ankita_Pankaj_s_GOA_Wedding_was_nothing_short_of_magical_a_sun_kissed_beachside_ceremony_golden-hour_portraits_glowing_with_love_and_a_breathtaking_Baraaat_arrival_in_a_timeless_v.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791781572/Devaki_X_Shiv___Royal_Wedding_Walkway.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791781572/Best_Destination_Wedding_Photographers_in_Goa___Timeless_Coastal_Love.webp',
      "https://res.cloudinary.com/nwqljqhb/image/upload/v1791781572/A_Dreamy_GOA_Beach_Wedding_%EF%B8%8F__Ankita_Pankaj_s_GOA_Wedding_was_nothing_short_of_magical_a_sun_kissed_beachside_ceremony_golden-hour_portraits_glowing_with_love_and_a_breathtaking_Baraaat_arrival_in_a_timeles_1.webp",
      "https://res.cloudinary.com/nwqljqhb/image/upload/v1791781572/Luxury_Spa_Resort_in_Goa___Best_Resort_in_Goa_-_ITC_Grand_Goa.webp",
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782526/A_floral_fairytale_designed_for_a_love_story_worth_celebrating_.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791781571/Best_Destination_Wedding_Photographers_in_Goa___Timeless_Coastal_Love_1.webp'
    ],

    // Destination 2: Udaipur (Rajasthan)
    udaipur: [
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782170/AGASHE_Recommends___Here_is_AGASHE_S_take_on_Finest_Destinations_to_host_your_new_beginnings_where_everything_is_on_point-_be_it_the_decor_or_vibes___Let_us_know_in_the_comment_section_which_one_would_you_pick____.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782170/Top_Floral_Wedding_Decorators_in_Mumbai.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782170/Palace_Romance__A_Symphony_of_Pastel_Pink_Crimson_Rose.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782170/Top_5_Indian_Destination_Wedding_Locations_You_Must_See.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782169/AGASHE_Recommends___Here_is_AGASHE_S_take_on_Finest_Destinations_to_host_your_new_beginnings_where_everything_is_on_point-_be_it_the_decor_or_vibes___Let_us_know_in_the_comment_section_which_one_would_you_pick__1.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782169/Wedding_Decorators_for_Luxury_Hotel_Weddings.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791782169/Floating_Mandap_Dream_in_Udaipur.webp'

    ],

    // Destination 3: Jaipur (Rajasthan)
    jaipur: [
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783702/Jaipur_Courtyard_by_Candlelight.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783600/download_4.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783600/Walking_down_the_aisle_Indian_Wedding_.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783600/Stage_decoration.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783599/Yanshree_as_a_bride_on_her_wedding_Day_Jai_Mahal_Palace_Jaipur_2024.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783599/Pranav_x_Jennifer___Celebrating_the_love_of_Pranav_Jen__May_their_love_continue_to_grow_stronger_with_each_passing_day___Bride__jlkaul94__Groom__pranavkaul6290__Planners__purplepatcheventsofficial__Venue__samod.webp',
      'https://res.cloudinary.com/nwqljqhb/image/upload/v1791783599/14_Evergreen_Wedding_Venues_in_Jaipur_Across_Generations_Capacity_Vibe_Celebrity_1.webp',

    ],

    // Destination 4: Rishikesh (Uttarakhand)
    rishikesh: [
     "https://res.cloudinary.com/nwqljqhb/image/upload/v1791784447/Rishikesh_Mountain_Wedding_Ceremony.webp",
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784447/Destination_Wedding.webp',
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784446/Indian_Wedding_at_Ganga_Ghat_in_Rishikesh.webp',
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784446/images_2.webp',
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784445/images_1.webp',
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784446/download_4.webp',
     'https://res.cloudinary.com/nwqljqhb/image/upload/v1791784696/WhatsApp202026-07-14203.55.4420PM.webp'

    ],

    // Destination 5: Jaisalmer (Rajasthan)
    jaisalmer: [
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785409/Jaisalmer_Twilight_Fort_Wedding.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785408/0f5bfd1a133dafcdb5e8fe1ea9bf24e6_converted.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785408/Jaisalmerimage3.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785407/images_1__converted.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785407/17704512341919edfe-25b6-4b00-8966-807145223d9f_converted.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785407/images_2__converted.webp',
        'https://res.cloudinary.com/nwqljqhb/image/upload/v1791785407/images_converted.webp'
    
    ],

    // Destination 6: Jim Corbett (Uttarakhand)
    jimCorbett: [
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
      'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
    ],
  },

  // ==========================================================================
  // 5. EVENT FUNCTIONS — PROJECT GALLERIES (#functions / #gallery)
  // Organized by Category -> Subcategory Function
  // ==========================================================================
  functions: {
    // Category A: Wedding Functions
    wedding: {
      // Engagement / Ring Ceremony
      'engagement-ring-ceremony': [
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
      ],

      // Mehendi & Haldi
      'mehendi-haldi': [
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
      ],

      // Wedding Ceremony (Phere, Mandap & Varmala)
      'wedding-ceremony': [
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
      ],

      // Baraat & Reception
      'baraat-reception': [
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
        'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
      ],
    },

    // Category B: Baby & Family Functions
    baby: {
      // Baby Shower (Godh Bharai)
      'baby-shower-godh-bharai': [],

      // Naming Ceremony (Naamkaran)
      'naming-ceremony-naamkaran': [],
    },

    // Category C: Religious Functions
    religious: {
      // Satyanarayan Katha
      'satyanarayan-katha': [],

      // Bhagwat Katha
      'bhagwat-katha': [],

      // Sundarkand Path
      'sundarkand-path': [],
    },
  },

  // ==========================================================================
  // 6. ABOUT US SECTION & FINAL CTA BANNER (#about)
  // - 1st link = Main feature image & Final CTA background
  // - 2nd–5th links = Collage grid photos
  // - 6th link = "One roof, every detail" bottom feature banner
  // ==========================================================================
  about: [
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/download_1_c1jc3u.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
  ],

  // ==========================================================================
  // 7. CLIENT TESTIMONIALS & REVIEWS (#testimonials)
  // Photos displayed alongside client review cards
  // ==========================================================================
  testimonials: [
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
  ],

  // ==========================================================================
  // 8. INSTAGRAM STRIP & PORTFOLIO GALLERY (#instagram)
  // 6 square photos displayed in the "Moments We're Proud to Share" strip
  // ==========================================================================
  instagram: [
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
  ],
}

// Alias `gallery` and `stories` to `instagram` so any component reading them stays in sync
images.gallery = images.instagram
images.stories = images.instagram

/**
 * Helper to normalize any category entry (array of URLs, single URL string,
 * or { cover, gallery } object) into a clean array of non-empty URL strings.
 */
export function toImageList(entry) {
  if (!entry) return []
  if (typeof entry === 'string') {
    const trimmed = entry.trim()
    return trimmed ? [trimmed] : []
  }
  if (Array.isArray(entry)) {
    return entry
      .filter((item) => typeof item === 'string' && item.trim().length > 0)
      .map((item) => item.trim())
  }
  if (typeof entry === 'object') {
    const list = [
      ...(typeof entry.cover === 'string' ? [entry.cover] : []),
      ...(Array.isArray(entry.gallery) ? entry.gallery : []),
      ...(Array.isArray(entry.images) ? entry.images : []),
      ...(Array.isArray(entry.videos) ? entry.videos : []),
      ...(typeof entry.video === 'string' ? [entry.video] : []),
      ...(typeof entry.poster === 'string' ? [entry.poster] : []),
    ]
    return [...new Set(list.filter((u) => typeof u === 'string' && u.trim().length > 0))]
  }
  return []
}

/**
 * Helper to get the primary cover image URL from a category entry
 * (returns the 1st URL in an array, or the string itself).
 */
export function getCoverImage(entry, fallback = '') {
  const list = toImageList(entry)
  return list[0] || fallback
}

/**
 * Named shorthand keys & categorized sections combined for backward compatibility.
 */
export const image = {
  heroVideo: images.hero.videos?.[0] || images.hero.video || '',
  heroPoster: images.hero.poster || '',
  hero: images.hero.poster || '',
  weddingBanner: getCoverImage(images.destinations.jaipur),
  festive: getCoverImage(images.honeymoon.manali),
  haldi: getCoverImage(images.functions.wedding['mehendi-haldi']),
  decor: getCoverImage(images.destinations.jimCorbett),
  phere: getCoverImage(images.destinations.udaipur),
  florals: getCoverImage(images.destinations.goa),
  mandap: images.about[4] || getCoverImage(images.destinations.udaipur),
  talambralu: getCoverImage(images.services.engagementPreWedding),
  photography: getCoverImage(images.functions.wedding['baraat-reception']),
  entry: getCoverImage(images.services.artistManagement),
  stage: getCoverImage(images.destinations.jaisalmer),
  couple: getCoverImage(images.services.honeymoonPackages),
  ...images,
}

export default image
