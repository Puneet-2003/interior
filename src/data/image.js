/**
 * Centralized Image Registry for Dream City Events Gwalior.
 *
 * All website images and media assets are hosted on Cloudinary with optimal
 * f_auto,q_auto transformations and responsive bounds.
 *
 * This file is the single source of truth for all image URLs in the project.
 * ZERO runtime dependency on Supabase for image storage or delivery.
 */

export const image = {
  // Hero Video & Poster Frame
  heroVideo:
    'https://res.cloudinary.com/ddelf4odl/video/upload/f_mp4,vc_h264,q_auto,w_1280,c_limit/v1791188243/15157499-hd_1920_1080_25fps_umckg8_1_eanpgz.mp4',
  heroPoster:
    'https://res.cloudinary.com/ddelf4odl/video/upload/f_auto,q_auto,w_1280,so_0/v1791188243/15157499-hd_1920_1080_25fps_umckg8_1_eanpgz.jpg',
  hero:
    'https://res.cloudinary.com/ddelf4odl/video/upload/f_auto,q_auto,w_1280,so_0/v1791188243/15157499-hd_1920_1080_25fps_umckg8_1_eanpgz.jpg',

  // Wedding & Ceremony Highlights
  weddingBanner:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/See_The_Most_Stunning_Indian-American_Wedding_hxecdb.jpg',
  festive:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320822/Celebrations25_Festive25_WeddingWire2026_n3bd94.jpg',
  haldi:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321040/Flower_themed_Haldi___Haldi_Ideas___Haldi_Inspo___yh7xnc.jpg',
  decor:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321039/download_rxyp1x.jpg',
  phere:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/Indian_Wedding_Phere_rwge20.jpg',
  florals:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785320821/A_wedding_filled_with_soft_florals_golden_light_and_timeless_emotion__From_intimate_moments_beneath_the_mandap_to_quiet_glances_that_spoke_louder_than_words_every_detail_of_this_celebration_captured_the_beauty_of_m_kkh51f.jpg',
  mandap:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321038/download_1_c1jc3u.jpg',
  talambralu:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/marriage_talambralu_swh01f.jpg',
  photography:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/Wedding_Photography_feuc26.jpg',
  entry:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_2_a80bce.jpg',
  stage:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_vadwhi.jpg',
  couple:
    'https://res.cloudinary.com/ddelf4odl/image/upload/f_auto,q_auto,w_800/v1785321706/download_1_v8uenc.jpg',
}

/**
 * Structured, categorized image mapping object.
 * Groups assets by feature section while reusing canonical URLs without duplication.
 */
export const images = {
  hero: {
    video: image.heroVideo,
    poster: image.heroPoster,
    desktop: image.heroPoster,
    mobile: image.heroPoster,
  },
  wedding: {
    banner: image.weddingBanner,
    phere: image.phere,
    mandap: image.mandap,
    talambralu: image.talambralu,
    couple: image.couple,
  },
  functions: {
    haldi: image.haldi,
    festive: image.festive,
    decor: image.decor,
    florals: image.florals,
    entry: image.entry,
    stage: image.stage,
    photography: image.photography,
  },
  about: [
    image.phere,
    image.festive,
    image.haldi,
    image.decor,
    image.mandap,
    image.florals,
  ],
  gallery: [
    image.entry,
    image.stage,
    image.weddingBanner,
    image.talambralu,
    image.couple,
    image.photography,
  ],
  testimonials: [
    image.florals,
  ],
  services: {
    weddingPlanning: image.phere,
    decoration: image.haldi,
    destination: image.florals,
    birthdayAnniversary: image.festive,
    corporate: image.stage,
    engagementPreWedding: image.talambralu,
    artistManagement: image.entry,
    honeymoon: image.couple,
  },
  destinations: {
    goa: image.florals,
    udaipur: image.phere,
    jaipur: image.weddingBanner,
    rishikesh: image.festive,
    jaisalmer: image.stage,
    jimCorbett: image.decor,
  },
  honeymoon: {
    goa: image.florals,
    kashmir: image.phere,
    manali: image.festive,
    bali: image.stage,
    maldives: image.weddingBanner,
    dubai: image.decor,
  },
}

export default image
