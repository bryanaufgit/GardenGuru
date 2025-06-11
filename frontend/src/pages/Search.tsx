import SearchInput from "../components/SearchInput";
import PageWrapper from "../components/PageWrapper";
import SectionTitle from "../components/SectionTitle";

export default function Search() {
  return (
    <PageWrapper>
      <SectionTitle>Pflanzensuche</SectionTitle>
      <SearchInput onSearch={() => {}} />
    </PageWrapper>
  );
}