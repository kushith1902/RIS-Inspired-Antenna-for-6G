import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with real music streams, artists, genres, and playlists...");

  // Clean existing
  await prisma.comment.deleteMany({});
  await prisma.listeningHistory.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.playlistSong.deleteMany({});
  await prisma.playlist.deleteMany({});
  await prisma.lyrics.deleteMany({});
  await prisma.songGenre.deleteMany({});
  await prisma.song.deleteMany({});
  await prisma.album.deleteMany({});
  await prisma.genre.deleteMany({});
  await prisma.artist.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create Demo Users & Artists
  const passwordHash = await bcrypt.hash("password123", 10);

  const artistUser1 = await prisma.user.create({
    data: {
      email: "artist.synthwave@spotify.com",
      passwordHash,
      fullName: "Kavinsky Neon",
      displayName: "Neon Horizon",
      role: Role.ARTIST,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      emailVerified: true
    }
  });

  const artist1 = await prisma.artist.create({
    data: {
      userId: artistUser1.id,
      bio: "Pioneer of retro-futuristic synthwave soundscapes and midnight drives.",
      headerImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
      verified: true,
      monthlyListeners: 1420500
    }
  });

  const artistUser2 = await prisma.user.create({
    data: {
      email: "artist.ambient@spotify.com",
      passwordHash,
      fullName: "Elena Rostova",
      displayName: "Aurora Echoes",
      role: Role.ARTIST,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
      emailVerified: true
    }
  });

  const artist2 = await prisma.artist.create({
    data: {
      userId: artistUser2.id,
      bio: "Cinematic chillout and ambient electronic producer from Stockholm.",
      headerImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
      verified: true,
      monthlyListeners: 890300
    }
  });

  // 2. Genres
  const synthwaveGenre = await prisma.genre.create({
    data: { name: "Synthwave", colorHex: "#E11D48", iconUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&q=80" }
  });
  const chillGenre = await prisma.genre.create({
    data: { name: "Lo-Fi & Chill", colorHex: "#0D9488", iconUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&q=80" }
  });
  const electronicGenre = await prisma.genre.create({
    data: { name: "Electronic", colorHex: "#7C3AED", iconUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80" }
  });

  // 3. Albums
  const album1 = await prisma.album.create({
    data: {
      title: "Midnight Overdrive",
      coverArtUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      releaseDate: new Date("2024-05-15"),
      artistId: artist1.id
    }
  });

  const album2 = await prisma.album.create({
    data: {
      title: "Starlight Resonance",
      coverArtUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80",
      releaseDate: new Date("2024-08-20"),
      artistId: artist2.id
    }
  });

  // 4. Songs with real streamable MP3 audio URLs
  const song1 = await prisma.song.create({
    data: {
      title: "Cyberpunk City Nights",
      durationSeconds: 372,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      explicit: false,
      playCount: 48920,
      artistId: artist1.id,
      albumId: album1.id,
      genres: { create: [{ genreId: synthwaveGenre.id }, { genreId: electronicGenre.id }] },
      lyrics: {
        create: {
          plainText: "[00:15.00] Neon lights shining bright\n[00:30.00] Cruising down the highway in the night\n[01:00.00] Digital dreams never die",
          syncedJson: [
            { timeMs: 15000, line: "Neon lights shining bright" },
            { timeMs: 30000, line: "Cruising down the highway in the night" },
            { timeMs: 60000, line: "Digital dreams never die" }
          ]
        }
      }
    }
  });

  const song2 = await prisma.song.create({
    data: {
      title: "Retro Highway",
      durationSeconds: 423,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      explicit: false,
      playCount: 31200,
      artistId: artist1.id,
      albumId: album1.id,
      genres: { create: [{ genreId: synthwaveGenre.id }] }
    }
  });

  const song3 = await prisma.song.create({
    data: {
      title: "Cosmic Whispers",
      durationSeconds: 345,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      explicit: false,
      playCount: 78900,
      artistId: artist2.id,
      albumId: album2.id,
      genres: { create: [{ genreId: chillGenre.id }, { genreId: electronicGenre.id }] },
      lyrics: {
        create: {
          plainText: "[00:10.00] Floating through eternity\n[00:40.00] Whispers of stars calling to me",
          syncedJson: [
            { timeMs: 10000, line: "Floating through eternity" },
            { timeMs: 40000, line: "Whispers of stars calling to me" }
          ]
        }
      }
    }
  });

  const song4 = await prisma.song.create({
    data: {
      title: "Stardust Drift",
      durationSeconds: 298,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      explicit: false,
      playCount: 15400,
      artistId: artist2.id,
      albumId: album2.id,
      genres: { create: [{ genreId: chillGenre.id }] }
    }
  });

  // 5. Demo Regular User & Playlist
  const demoUser = await prisma.user.create({
    data: {
      email: "user@spotify.com",
      passwordHash,
      fullName: "Alex Rivera",
      displayName: "Alex Rivera",
      role: Role.PREMIUM_USER,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80",
      emailVerified: true
    }
  });

  const playlist = await prisma.playlist.create({
    data: {
      title: "Late Night Focus & Chill",
      description: "Atmospheric synthwave and cosmic ambient tracks for deep work and coding.",
      coverArtUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
      ownerId: demoUser.id,
      isPublic: true,
      songs: {
        create: [
          { songId: song1.id, position: 1 },
          { songId: song3.id, position: 2 },
          { songId: song2.id, position: 3 },
          { songId: song4.id, position: 4 }
        ]
      }
    }
  });

  console.log("Seeding finished successfully!");
  console.log(`Demo User login: email='user@spotify.com', password='password123'`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
