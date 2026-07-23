export const INDIAN_GENRES = [
  { id: "g-bolly", name: "Bollywood Romance & Pop", colorHex: "#E11D48", iconUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80" },
  { id: "g-indie", name: "Indie India & Acoustic", colorHex: "#10B981", iconUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80" },
  { id: "g-punjabi", name: "Punjabi & Sufi Hits", colorHex: "#F59E0B", iconUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80" },
  { id: "g-remix", name: "EDM & Indian Remixes", colorHex: "#8B5CF6", iconUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80" }
];

export const INDIAN_ARTISTS = [
  { id: "art-arijit", name: "Arijit Singh", bio: "India's premier romantic playback singer.", verified: true, monthlyListeners: 42100000 },
  { id: "art-anuv", name: "Anuv Jain", bio: "Acclaimed singer-songwriter known for acoustic indie hits.", verified: true, monthlyListeners: 18400000 },
  { id: "art-vishal", name: "Vishal Mishra", bio: "Music composer and singer delivering emotional ballads.", verified: true, monthlyListeners: 15200000 },
  { id: "art-shreya", name: "Shreya Ghoshal", bio: "Legendary Indian playback singer.", verified: true, monthlyListeners: 28900000 },
  { id: "art-sachet", name: "Sachet–Parampara", bio: "Dynamic music director duo behind chartbusters.", verified: true, monthlyListeners: 12800000 },
  { id: "art-banjaare", name: "Banjaare", bio: "Soulful indie folk music collective.", verified: true, monthlyListeners: 4200000 },
  { id: "art-navjot", name: "Navjot Ahuja", bio: "Rising indie singer-songwriter.", verified: true, monthlyListeners: 3100000 },
  { id: "art-gajendra", name: "Gajendra Verma", bio: "Popular pop & romantic artist.", verified: true, monthlyListeners: 9800000 },
  { id: "art-anurag", name: "Anurag Saikia", bio: "National Award-winning music composer.", verified: true, monthlyListeners: 5400000 }
];

export const INDIAN_ALBUMS = [
  { id: "alb-coke", title: "Coke Studio Bharat (Season 2)", coverArtUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80", releaseDate: "2024-02-14", artistName: "Anuv Jain" },
  { id: "alb-saiyaara", title: "Saiyaara Soundtrack", coverArtUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", releaseDate: "2024-05-20", artistName: "Vishal Mishra" },
  { id: "alb-animal", title: "ANIMAL Soundtrack", coverArtUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80", releaseDate: "2023-12-01", artistName: "Vishal Mishra & Arijit Singh" },
  { id: "alb-jawan", title: "Jawan Original Soundtrack", coverArtUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", releaseDate: "2023-09-07", artistName: "Arijit Singh & Shilpa Rao" },
  { id: "alb-lapataa", title: "Laapataa Ladies", coverArtUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", releaseDate: "2024-03-01", artistName: "Arijit Singh" }
];

export const TOP_20_INDIAN_SONGS = [
  {
    id: "rank-1",
    title: "Arz Kiya Hai",
    durationSeconds: 225,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    explicit: false,
    playCount: 48920100,
    artistId: "art-anuv",
    artist: { id: "art-anuv", name: "Anuv Jain (Coke Studio Bharat)" },
    album: INDIAN_ALBUMS[0],
    lyrics: {
      id: "l-1",
      songId: "rank-1",
      plainText: "[00:10.00] Arz kiya hai shab-e-gham mein\n[00:25.00] Tum ho toh har lamha haseen hai\n[00:45.00] Dil ki baatein suno zara",
      syncedJson: [
        { timeMs: 10000, line: "Arz kiya hai shab-e-gham mein" },
        { timeMs: 25000, line: "Tum ho toh har lamha haseen hai" },
        { timeMs: 45000, line: "Dil ki baatein suno zara" }
      ]
    }
  },
  {
    id: "rank-2",
    title: "Tum Ho Toh (From Saiyaara)",
    durationSeconds: 248,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    explicit: false,
    playCount: 61200400,
    artistId: "art-vishal",
    artist: { id: "art-vishal", name: "Vishal Mishra, Hansika Pareek" },
    album: INDIAN_ALBUMS[1]
  },
  {
    id: "rank-3",
    title: "Bairan",
    durationSeconds: 210,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    explicit: false,
    playCount: 23400100,
    artistId: "art-banjaare",
    artist: { id: "art-banjaare", name: "Banjaare" },
    album: INDIAN_ALBUMS[1]
  },
  {
    id: "rank-4",
    title: "Khat",
    durationSeconds: 195,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    explicit: false,
    playCount: 18900500,
    artistId: "art-navjot",
    artist: { id: "art-navjot", name: "Navjot Ahuja" },
    album: INDIAN_ALBUMS[1]
  },
  {
    id: "rank-5",
    title: "Gehra Hua",
    durationSeconds: 260,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    explicit: false,
    playCount: 38400000,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Shashwat Sachdev, Arijit Singh" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-6",
    title: "Tujhe Kitna Chahne Lage",
    durationSeconds: 284,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    explicit: false,
    playCount: 189400200,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh" },
    album: INDIAN_ALBUMS[2],
    lyrics: {
      id: "l-6",
      songId: "rank-6",
      plainText: "[00:15.00] Dil ka dariya beh hi gaya\n[00:35.00] Ishq ibadat ban hi gaya\n[01:00.00] Tujhe kitna chahne lage hum",
      syncedJson: [
        { timeMs: 15000, line: "Dil ka dariya beh hi gaya" },
        { timeMs: 35000, line: "Ishq ibadat ban hi gaya" },
        { timeMs: 60000, line: "Tujhe kitna chahne lage hum" }
      ]
    }
  },
  {
    id: "rank-7",
    title: "Samjhawan",
    durationSeconds: 269,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    explicit: false,
    playCount: 142008000,
    artistId: "art-shreya",
    artist: { id: "art-shreya", name: "Jawad Ahmad, Arijit Singh, Shreya Ghoshal" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-8",
    title: "KALYANI (Remix)",
    durationSeconds: 215,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    explicit: false,
    playCount: 29500000,
    artistId: "art-shreya",
    artist: { id: "art-shreya", name: "ARJN, KDS, FIFTY4, Shreya Ghoshal" },
    album: INDIAN_ALBUMS[3]
  },
  {
    id: "rank-9",
    title: "Mann Mera",
    durationSeconds: 200,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    explicit: false,
    playCount: 112000500,
    artistId: "art-gajendra",
    artist: { id: "art-gajendra", name: "Gajendra Verma" },
    album: INDIAN_ALBUMS[3]
  },
  {
    id: "rank-10",
    title: "Sajni",
    durationSeconds: 170,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    explicit: false,
    playCount: 145900000,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh" },
    album: INDIAN_ALBUMS[4],
    lyrics: {
      id: "l-10",
      songId: "rank-10",
      plainText: "[00:10.00] Sajni re kaise kate din ratiya\n[00:25.00] Baaton hi baaton mein beet gaye din",
      syncedJson: [
        { timeMs: 10000, line: "Sajni re kaise kate din ratiya" },
        { timeMs: 25000, line: "Baaton hi baaton mein beet gaye din" }
      ]
    }
  },
  {
    id: "rank-11",
    title: "Raanjhan",
    durationSeconds: 240,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    explicit: false,
    playCount: 84000300,
    artistId: "art-sachet",
    artist: { id: "art-sachet", name: "Sachet–Parampara" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-12",
    title: "O Maahi",
    durationSeconds: 233,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    explicit: false,
    playCount: 168000400,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-13",
    title: "Ishq Hai",
    durationSeconds: 210,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    explicit: false,
    playCount: 32000500,
    artistId: "art-anurag",
    artist: { id: "art-anurag", name: "Anurag Saikia" },
    album: INDIAN_ALBUMS[0]
  },
  {
    id: "rank-14",
    title: "Husn",
    durationSeconds: 218,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    explicit: false,
    playCount: 195000000,
    artistId: "art-anuv",
    artist: { id: "art-anuv", name: "Anuv Jain" },
    album: INDIAN_ALBUMS[0],
    lyrics: {
      id: "l-14",
      songId: "rank-14",
      plainText: "[00:12.00] Dekho dekho kaisa baatein yeh kare\n[00:30.00] Husn tera taareef kare",
      syncedJson: [
        { timeMs: 12000, line: "Dekho dekho kaisa baatein yeh kare" },
        { timeMs: 30000, line: "Husn tera taareef kare" }
      ]
    }
  },
  {
    id: "rank-15",
    title: "Pehle Bhi Main",
    durationSeconds: 250,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    explicit: false,
    playCount: 154000300,
    artistId: "art-vishal",
    artist: { id: "art-vishal", name: "Vishal Mishra" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-16",
    title: "Jo Tum Mere Ho",
    durationSeconds: 245,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    explicit: false,
    playCount: 92000400,
    artistId: "art-anuv",
    artist: { id: "art-anuv", name: "Anuv Jain" },
    album: INDIAN_ALBUMS[0]
  },
  {
    id: "rank-17",
    title: "Chaleya",
    durationSeconds: 200,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    explicit: false,
    playCount: 178000500,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh, Shilpa Rao" },
    album: INDIAN_ALBUMS[3]
  },
  {
    id: "rank-18",
    title: "Satranga",
    durationSeconds: 271,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    explicit: false,
    playCount: 135000000,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-19",
    title: "Apna Bana Le",
    durationSeconds: 261,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    explicit: false,
    playCount: 210000000,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh, Sachin–Jigar" },
    album: INDIAN_ALBUMS[2]
  },
  {
    id: "rank-20",
    title: "Heeriye",
    durationSeconds: 194,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    explicit: false,
    playCount: 185000000,
    artistId: "art-arijit",
    artist: { id: "art-arijit", name: "Arijit Singh, Jasleen Royal" },
    album: INDIAN_ALBUMS[2]
  }
];

export const INDIAN_SONGS = TOP_20_INDIAN_SONGS;

export const INDIAN_PLAYLISTS = [
  {
    id: "pl-top-20",
    title: "India Top 20 Songs",
    description: "The official top 20 viral & trending Indian tracks (Anuv Jain, Arijit Singh, Vishal Mishra & more).",
    coverArtUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    isPublic: true,
    ownerId: "u-demo",
    songCount: TOP_20_INDIAN_SONGS.length,
    songs: TOP_20_INDIAN_SONGS
  }
];
