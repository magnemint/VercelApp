// app/persona/page.tsx  (server)
import ClientPersona from "../../components/PersonaPageClient";

export const metadata = {
  title: "Explore Persona | Destiny",
  icons: {
    icon: "/persona-ip/favicon.ico",
  },
};

export default function Page() {
  return <ClientPersona />;
}
