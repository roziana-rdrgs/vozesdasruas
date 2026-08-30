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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vel lorem vitae ipsum consequat tincidunt.
            </p>
          </div>

          <div className="about-values__grid">
            <article className="about-value">
              <span className="about-value__number">01</span>

              <h3>Respeito</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Integer consequat sapien vitae lectus tincidunt, vitae
                suscipit lorem posuere.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">02</span>

              <h3>Empatia</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse potenti. Praesent tincidunt felis vitae lorem
                volutpat, non consectetur ipsum consequat.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">03</span>

              <h3>Solidariedade</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                vitae neque vel ipsum consequat aliquam. Sed consectetur erat at
                massa tincidunt.
              </p>
            </article>

            <article className="about-value">
              <span className="about-value__number">04</span>

              <h3>Dignidade</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                erat volutpat. Donec feugiat, massa vitae consectetur tincidunt,
                lectus lorem consequat.
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
