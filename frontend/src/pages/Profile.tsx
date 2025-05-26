import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";

export default function Profile() {
  return (
    <PageWrapper>
      <SectionTitle>Profil</SectionTitle>
      <p className="text-gray-600">Hier kannst du später dein Profil verwalten.</p>
    </PageWrapper>
  );
}