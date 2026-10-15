import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// ---------- Couleurs ZELYVO ----------
const C = {
  bg: "#0A0712",
  card: "#151021",
  line: "#2A2140",
  violet: "#7C3AED",
  blue: "#1156FD",
  cyan: "#00C3FC",
  text: "#F7F4FF",
  muted: "#A9A1B8",
  like: "#F43F5E",
};

const logo = require("./assets/logo-z.png");

// ---------- Données d'exemple (fausses, pour le prototype) ----------
const people = [
  ["Joseph", 12],
  ["Aminata", 47],
  ["Kevin", 33],
  ["Mariam", 44],
];
const posts = [
  ["Aminata", 47, "Une nouvelle journée, une nouvelle énergie. ✨", "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900", 248, 32],
  ["Kevin", 33, "Construire. Apprendre. Recommencer. 🚀", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900", 184, 21],
];
const chats = [
  ["Aminata", 47, "On se voit demain ? 😄", "09:41", 2],
  ["Kevin", 33, "Super projet, bravo 🚀", "Hier", 0],
  ["Mariam", 44, "Merci pour le partage !", "Lun", 0],
  ["Joseph", 12, "Bienvenue sur ZELYVO ✨", "Dim", 0],
];
const avatar = (n) => `https://i.pravatar.cc/120?img=${n}`;

// ---------- Écrans ----------
function Header() {
  return (
    <View style={s.header}>
      <View style={s.brand}>
        <Image source={logo} style={s.logoImg} resizeMode="contain" />
        <View>
          <Text style={s.logo}>ZELYVO</Text>
          <Text style={s.tag}>Connect. Share. Be You.</Text>
        </View>
      </View>
      <View style={s.headerIcons}>
        <View style={s.iconBtn}>
          <Ionicons name="search-outline" size={20} color={C.text} />
        </View>
        <View style={s.iconBtn}>
          <Ionicons name="notifications-outline" size={20} color={C.text} />
          <View style={s.badge} />
        </View>
      </View>
    </View>
  );
}

function Stories() {
  return (
    <View>
      <Text style={s.section}>Stories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={s.story}>
          <View style={[s.ring, { borderColor: C.line }]}>
            <View style={s.addStory}>
              <Ionicons name="add" size={26} color={C.cyan} />
            </View>
          </View>
          <Text style={s.storyName}>Ta story</Text>
        </View>
        {people.map(([n, i]) => (
          <View style={s.story} key={n}>
            <View style={s.ring}>
              <Image source={{ uri: avatar(i) }} style={s.storyImg} />
            </View>
            <Text style={s.storyName}>{n}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Post({ p }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, id, text, img, likes, comments] = p;
  return (
    <View style={s.post}>
      <View style={s.row}>
        <Image source={{ uri: avatar(id) }} style={s.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{name}</Text>
          <Text style={s.handle}>@{name.toLowerCase()} · maintenant</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color={C.muted} />
      </View>
      <Text style={s.postText}>{text}</Text>
      <Image source={{ uri: img }} style={s.postImage} />
      <View style={s.actions}>
        <TouchableOpacity style={s.action} onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? C.like : C.text}
          />
          <Text style={s.actionText}>{likes + (liked ? 1 : 0)}</Text>
        </TouchableOpacity>
        <View style={s.action}>
          <Ionicons name="chatbubble-outline" size={22} color={C.text} />
          <Text style={s.actionText}>{comments}</Text>
        </View>
        <View style={s.action}>
          <Ionicons name="paper-plane-outline" size={22} color={C.text} />
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setSaved(!saved)}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={22}
            color={saved ? C.cyan : C.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Home() {
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Stories />
        <View style={s.compose}>
          <Image source={{ uri: avatar(12) }} style={s.composeAvatar} />
          <Text style={s.composeText}>Quoi de neuf ? Partage quelque chose...</Text>
          <Ionicons name="image-outline" size={22} color={C.cyan} />
        </View>
        {posts.map((p, i) => (
          <Post p={p} key={i} />
        ))}
      </ScrollView>
    </>
  );
}

function UserRow({ n, i }) {
  const [on, setOn] = useState(false);
  return (
    <View style={s.user}>
      <Image source={{ uri: avatar(i) }} style={s.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{n}</Text>
        <Text style={s.handle}>Créateur ZELYVO</Text>
      </View>
      <TouchableOpacity onPress={() => setOn(!on)} style={[s.follow, on && s.followOn]}>
        <Text style={[s.followText, on && { color: C.cyan }]}>{on ? "Suivi" : "Suivre"}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Discover() {
  return (
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>Découvrir</Text>
      <View style={s.search}>
        <Ionicons name="search" size={20} color={C.muted} />
        <TextInput
          placeholder="Rechercher sur ZELYVO"
          placeholderTextColor={C.muted}
          style={s.input}
        />
      </View>
      <Text style={s.section}>Suggestions pour toi</Text>
      {people.map(([n, i]) => (
        <UserRow n={n} i={i} key={n} />
      ))}
    </ScrollView>
  );
}

function Publish() {
  return (
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.title}>Nouvelle publication</Text>
      <View style={s.publishCard}>
        <Ionicons name="sparkles-outline" size={34} color={C.cyan} />
        <Text style={s.publishTitle}>Bientôt disponible</Text>
        <Text style={[s.handle, { textAlign: "center" }]}>
          La publication de photos, de vidéos et de stories arrivera avec les comptes ZELYVO.
        </Text>
      </View>
    </ScrollView>
  );
}

function Messages() {
  return (
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>Messages</Text>
      {chats.map(([n, i, last, time, unread]) => (
        <View style={s.user} key={n}>
          <Image source={{ uri: avatar(i) }} style={s.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{n}</Text>
            <Text style={s.handle} numberOfLines={1}>{last}</Text>
          </View>
          <View style={{ alignItems: "flex-end", gap: 6 }}>
            <Text style={s.handle}>{time}</Text>
            {unread > 0 ? (
              <View style={s.unread}>
                <Text style={s.unreadText}>{unread}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Profile() {
  return (
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.profile}>
        <Image source={{ uri: avatar(12) }} style={s.profileAvatar} />
        <Text style={s.profileName}>Joseph Putu</Text>
        <Text style={s.handle}>@joseph · ZELYVO</Text>
        <Text style={s.bio}>Connect. Share. Be You. ✨</Text>
        <View style={s.statsCard}>
          <View style={s.statBox}>
            <Text style={s.statN}>24</Text>
            <Text style={s.handle}>Publications</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statN}>1.2K</Text>
            <Text style={s.handle}>Abonnés</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statN}>386</Text>
            <Text style={s.handle}>Abonnements</Text>
          </View>
        </View>
      </View>
      <View style={s.edit}>
        <Text style={s.followText}>Modifier le profil</Text>
      </View>
    </ScrollView>
  );
}

// ---------- Barre du bas ----------
const tabs = [
  ["home", "home-outline", "Accueil"],
  ["compass", "compass-outline", "Découvrir"],
  ["add", "add", "Publier"],
  ["chatbubbles", "chatbubbles-outline", "Messages"],
  ["person", "person-outline", "Profil"],
];

function Nav({ tab, setTab }) {
  return (
    <View style={s.navWrap}>
      <View style={s.nav}>
        {tabs.map(([on, off, label], i) => {
          const active = tab === i;
          if (i === 2) {
            return (
              <TouchableOpacity key={label} onPress={() => setTab(i)} style={s.navItem} activeOpacity={0.8}>
                <View style={s.plus}>
                  <Ionicons name="add" size={30} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity key={label} onPress={() => setTab(i)} style={s.navItem}>
              <Ionicons name={active ? on : off} size={23} color={active ? C.cyan : C.muted} />
              <Text style={[s.navText, active && { color: C.cyan }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ---------- Application ----------
export default function App() {
  const [tab, setTab] = useState(0);
  const [ready, fontError] = useFonts(Ionicons.font);
  if (!ready && !fontError) return null;
  const screens = [<Home />, <Discover />, <Publish />, <Messages />, <Profile />];
  return (
    <SafeAreaView
      style={[s.safe, { paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0 }]}
    >
      <StatusBar style="light" />
      {screens[tab]}
      <Nav tab={tab} setTab={setTab} />
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoImg: { width: 38, height: 38 },
  logo: { fontSize: 21, fontWeight: "900", letterSpacing: 4, color: C.text },
  tag: { fontSize: 10, color: C.muted, marginTop: 1 },
  headerIcons: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.cyan,
  },
  content: { padding: 16, paddingBottom: 130 },
  section: { fontSize: 17, fontWeight: "800", color: C.text, marginVertical: 12 },
  story: { width: 78, alignItems: "center", marginRight: 8 },
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: C.violet,
    padding: 3,
  },
  storyImg: { width: 56, height: 56, borderRadius: 28 },
  addStory: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.card,
    alignItems: "center",
    justifyContent: "center",
  },
  storyName: { fontSize: 11, color: C.muted, marginTop: 6 },
  compose: {
    marginTop: 14,
    padding: 12,
    borderRadius: 20,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  composeAvatar: { width: 36, height: 36, borderRadius: 18 },
  composeText: { color: C.muted, flex: 1 },
  post: {
    backgroundColor: C.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.line,
    padding: 14,
    marginTop: 16,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { color: C.text, fontWeight: "800", fontSize: 15 },
  handle: { color: C.muted, fontSize: 12, marginTop: 2 },
  postText: { color: C.text, fontSize: 15, lineHeight: 22, marginVertical: 12 },
  postImage: { width: "100%", height: 300, borderRadius: 18 },
  actions: { flexDirection: "row", alignItems: "center", paddingTop: 14 },
  action: { flexDirection: "row", alignItems: "center", gap: 6, marginRight: 20 },
  actionText: { color: C.muted, fontSize: 13 },
  title: { fontSize: 29, fontWeight: "900", color: C.text, marginBottom: 18 },
  search: {
    height: 50,
    borderRadius: 16,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.line,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  input: { flex: 1, color: C.text },
  user: {
    backgroundColor: C.card,
    padding: 13,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.line,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  follow: {
    backgroundColor: C.violet,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.violet,
  },
  followOn: { backgroundColor: "transparent", borderColor: C.cyan },
  followText: { color: "#FFFFFF", fontWeight: "800" },
  unread: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.violet,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  unreadText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  publishCard: {
    backgroundColor: C.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.line,
    padding: 28,
    alignItems: "center",
    gap: 10,
  },
  publishTitle: { color: C.text, fontSize: 20, fontWeight: "800" },
  profile: { alignItems: "center", paddingTop: 10 },
  profileAvatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: C.violet,
  },
  profileName: { color: C.text, fontSize: 24, fontWeight: "900", marginTop: 12 },
  bio: { color: C.text, marginTop: 10 },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: C.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.line,
    padding: 16,
    width: "100%",
    marginTop: 22,
  },
  statBox: { alignItems: "center" },
  statN: { color: C.text, fontSize: 18, fontWeight: "900", textAlign: "center" },
  edit: {
    marginTop: 18,
    backgroundColor: C.violet,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  navWrap: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 14 },
  nav: {
    height: 68,
    backgroundColor: "#120D1E",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: C.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 8,
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 10, color: C.muted, marginTop: 3 },
  plus: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.violet,
    alignItems: "center",
    justifyContent: "center",
  },
});
