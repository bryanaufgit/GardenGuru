import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";

export default function Wishlist() {
  return (
    <PageWrapper>
      <SectionTitle>Wunschliste</SectionTitle>
      <p className="text-gray-600">Hier werden später deine Wunschpflanzen angezeigt.</p>
    </PageWrapper>
  );
}