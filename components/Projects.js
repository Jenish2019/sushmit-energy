const projectList = [
  {
    title: "MYAGDI KHOLA HYDROPOWER PROJECT (57.3 MW)",
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg",
    link: "/myagdi-khola-hydropower-project/"
  },
  {
    title: "Kunaban Khola Hydropower Project (24.78 MW)",
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg",
    link: "/kunaban-khola-hydropower-project/"
  },
  {
    title: "Myagdi Khola-B Hydropower Project (12.5 MW)",
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg",
    link: "/myagdi-khola-b-hydropower-project/"
  }
];

export default function Projects() {
  return (
    <section className="projects">
      <div className="overlay">
        <div className="container">
          <h2 className="title2">Our Projects</h2>
          <div className="projects-list">
            <div className="row">
              {projectList.map((project, i) => (
                <div className="col-md-3 col-sm-6 col-xs-6 cm-res" key={i}>
                  <div className="projects-item">
                    <div className="img">
                      <img width="660" height="371" src={project.img} className="img-responsive wp-post-image" alt={project.title} />
                      <div className="hover-box">
                        <a href={project.link}>
                          <i className="fa fa-chain"></i>
                        </a>
                      </div>
                    </div>
                    <a href={project.link} className="project-title">
                      <h4>{project.title}</h4>
                    </a>
                  </div>
                </div>
              ))}
              <div className="col-md-3 col-sm-6 col-xs-6 cm-res">
                <div className="projects-item" style={{ background: '#0f8a43', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a href="/projects/" className="btn btn-green2">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}