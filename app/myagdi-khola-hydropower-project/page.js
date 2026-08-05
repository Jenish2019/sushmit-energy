import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProjectDetail from '../../components/ProjectDetail';
import { getProjectBySlug } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function MyagdiKholaPage() {
  const project = await getProjectBySlug('myagdi-khola-hydropower-project');
  if (!project) return null;
  return (
    <>
      <Header />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
