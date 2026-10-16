import aboutImage from "../../assets/images/action-02.jpeg";
import "./About.css";
export function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__content">
          <span className="eyebrow">SOBRE O PROJETO</span>

          <h1>
            Conheça as vozes
            <br />
            por trás da rua.
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>
      </section>

      <section className="section section--light">
        <div className="container about-story">
          <div className="about-story__image">
            <img src={aboutImage} alt="Ação do projeto Vozes das Ruas" />
          </div>

          <div className="about-story__content">
            <span className="eyebrow">NOSSA HISTÓRIA</span>

            <h2>
              Um projeto feito por pessoas,
              <strong> para pessoas.</strong>
            </h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vel sem vitae erat malesuada tincidunt. Donec tincidunt, nisl
              vitae tincidunt malesuada, justo erat consectetur libero, vitae
              facilisis massa lorem vitae erat.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              commodo, arcu non tincidunt elementum, neque neque ullamcorper
              lorem, vitae tincidunt libero lorem at justo.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">NOSSOS VALORES</span>

            <h2>
              Aquilo que nos
              <br />
              move.
            </h2>

            <p>
              Respeito, empatia, solidariedade e dignidade são os pilares que
              sustentam o trabalho do Vozes das Ruas SM. Acreditamos que cada
              pessoa merece ser tratada com humanidade e compaixão,
              independentemente de sua situação social.
            </p>
          </div>

          <div className="about-values__grid">
            <article className="about-value">
              <span className="about-value__number">01</span>

              <h3>Alimentação</h3>

              <p>
                Preparação e distribuição de refeições para pessoas em situação
                de rua.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">02</span>

              <h3>Acolhimento</h3>

              <p>
                Escuta, conversa e presença para lembrar que cada pessoa tem uma
                história.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">03</span>

              <h3>Solidariedade</h3>

              <p>
                Arrecadação e distribuição de itens como roupas, cobertores e
                produtos de higiene.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">04</span>

              <h3>Luta</h3>

              <p>
                Fortalecer o movimento social na defesa dos direitos da
                população em situação de rua, dando visibilidade às suas
                reivindicações e lutando por cidadania, justiça social e
                políticas públicas efetivas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-quote">
        <div className="container">
          <span className="eyebrow">NOSSA MISSÃO</span>

          <blockquote>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae lorem at ipsum tincidunt consequat.”
          </blockquote>
        </div>
      </section>

      <section className="section section--light">
        <div className="container about-join">
          <div>
            <span className="eyebrow">FAÇA PARTE</span>

            <h2>
              A transformação começa
              <br />
              quando a gente participa.
            </h2>
          </div>

          <div className="about-join__content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae.
            </p>

            <a
              href="https://www.instagram.com/vozesdasruasm/"
              target="_blank"
              rel="noreferrer"
              className="button button--primary"
            >
              Acompanhe nosso trabalho
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
