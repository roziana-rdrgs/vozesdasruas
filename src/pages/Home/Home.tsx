import logo from "../../assets/images/logo.png";

import action01 from "../../assets/images/action-01.jpeg";
import action02 from "../../assets/images/action-02.jpeg";
import action03 from "../../assets/images/action-03.jpeg";

import heroImage from "../../assets/images/hero.jpeg";
export const Home = () => (
  <>
    {" "}
    <section className="hero">
      <div className="container hero__content">
        <span className="eyebrow">VOZES DAS RUAS SM</span>

        <h1>
          Olhar para o outro
          <br />
          também é cuidar.
        </h1>

        <p>
          Um projeto que transforma solidariedade em ação, levando alimento,
          acolhimento e atenção para pessoas em situação de vulnerabilidade
          social.
        </p>

        <div className="hero__actions">
          <a href="#sobre" className="button button--primary">
            Conheça o projeto
          </a>

          <a href="#como-ajudar" className="button button--secondary">
            Como ajudar
          </a>
        </div>
      </div>

      <div className="hero__image">
        <img src={heroImage} alt="Ação do projeto Vozes das Ruas" />
      </div>
    </section>
    <section id="sobre" className="section section--light">
      {" "}
      <div className="container about">
        {" "}
        <div className="about__label">
          {" "}
          <span className="eyebrow">SOBRE O PROJETO</span>{" "}
        </div>{" "}
        <div className="about__content">
          {" "}
          <h2>
            {" "}
            Mais do que entregar alimento. <br />{" "}
            <strong>É enxergar pessoas.</strong>{" "}
          </h2>{" "}
          <p>
            {" "}
            O Vozes das Ruas SM nasceu em Santa Maria com o propósito de olhar
            para uma realidade muitas vezes invisibilizada: a vida das pessoas
            em situação de rua.{" "}
          </p>{" "}
          <p>
            {" "}
            Através do trabalho voluntário, o projeto promove ações de
            alimentação, acolhimento e solidariedade, criando encontros que vão
            muito além da entrega de uma refeição.{" "}
          </p>{" "}
          <a href="/sobre" className="text-link">
            {" "}
            Conheça nossa história →{" "}
          </a>{" "}
        </div>{" "}
      </div>{" "}
    </section>{" "}
    <section className="section impact">
      {" "}
      <div className="container">
        {" "}
        <div className="section-heading">
          {" "}
          <span className="eyebrow">NOSSO IMPACTO</span>{" "}
          <h2>
            {" "}
            Solidariedade que <br /> se transforma em ação.{" "}
          </h2>{" "}
        </div>{" "}
        <div className="impact__grid">
          {" "}
          <article className="impact-card">
            {" "}
            <strong>13 mil+</strong> <span>marmitas distribuídas</span>{" "}
          </article>{" "}
          <article className="impact-card">
            {" "}
            <strong>2019</strong> <span>ano em que o projeto nasceu</span>{" "}
          </article>{" "}
          <article className="impact-card">
            {" "}
            <strong>36+</strong> <span>voluntários envolvidos</span>{" "}
          </article>{" "}
        </div>{" "}
      </div>{" "}
    </section>{" "}
    <section id="como-ajudar" className="section section--light">
      {" "}
      <div className="container">
        {" "}
        <div className="section-heading section-heading--center">
          {" "}
          <span className="eyebrow">COMO ATUAMOS</span>{" "}
          <h2>Pequenas ações podem fazer uma grande diferença.</h2>{" "}
          <p>
            {" "}
            O trabalho acontece através da união de voluntários, doadores e
            pessoas que acreditam que cuidar do outro também é uma forma de
            transformar a cidade.{" "}
          </p>{" "}
        </div>{" "}
        <div className="actions-grid">
          {" "}
          <article className="action-card">
            {" "}
            <span className="action-card__number">01</span> <h3>Alimentação</h3>{" "}
            <p>
              {" "}
              Preparação e distribuição de refeições para pessoas em situação de
              rua.{" "}
            </p>{" "}
          </article>{" "}
          <article className="action-card">
            {" "}
            <span className="action-card__number">02</span> <h3>Acolhimento</h3>{" "}
            <p>
              {" "}
              Escuta, conversa e presença para lembrar que cada pessoa tem uma
              história.{" "}
            </p>{" "}
          </article>{" "}
          <article className="action-card">
            {" "}
            <span className="action-card__number">03</span>{" "}
            <h3>Solidariedade</h3>{" "}
            <p>
              {" "}
              Arrecadação e distribuição de itens como roupas, cobertores e
              produtos de higiene.{" "}
            </p>{" "}
          </article>{" "}
        </div>{" "}
      </div>{" "}
    </section>{" "}
    <section id="publicacoes" className="section publications">
      {" "}
      <div className="container">
        {" "}
        <div className="section-heading section-heading--row">
          {" "}
          <div>
            {" "}
            <span className="eyebrow">PUBLICAÇÕES</span>{" "}
            <h2>Histórias que precisam ser ouvidas.</h2>{" "}
          </div>{" "}
          <a href="/publicacoes" className="text-link">
            {" "}
            Ver todas →{" "}
          </a>{" "}
        </div>{" "}
        <div className="posts-grid">
          {" "}
          <article className="post-card post-card--featured">
            <div className="post-card__image">
              <img src={action01} alt="Ação do projeto Vozes das Ruas" />
            </div>

            <div className="post-card__content">
              <span className="post-card__category">AÇÕES</span>

              <h3>Um encontro que vai muito além de uma refeição.</h3>

              <p>
                Conheça um pouco mais sobre as ações realizadas pelo projeto.
              </p>
            </div>
          </article>
          <article className="post-card">
            <div className="post-card__image">
              <img src={action02} alt="Voluntários durante uma ação" />
            </div>

            <div className="post-card__content">
              <span className="post-card__category">VOLUNTARIADO</span>

              <h3>Quando muitas mãos se unem, a transformação acontece.</h3>

              <p>Faça parte dessa rede de solidariedade.</p>
            </div>
          </article>
          <article className="post-card">
            <div className="post-card__image">
              <img src={action03} alt="Ação social do Vozes das Ruas" />
            </div>

            <div className="post-card__content">
              <span className="post-card__category">HISTÓRIAS</span>

              <h3>
                Cada pessoa tem uma história. Cada história merece ser ouvida.
              </h3>

              <p>Histórias e momentos compartilhados nas ações do projeto.</p>
            </div>
          </article>
        </div>{" "}
      </div>{" "}
    </section>{" "}
    <section className="section social">
      {" "}
      <div className="container social__content">
        {" "}
        <div>
          {" "}
          <span className="eyebrow">ACOMPANHE DE PERTO</span>{" "}
          <h2>
            {" "}
            O que acontece nas ruas, <br /> você acompanha por aqui.{" "}
          </h2>{" "}
          <p>
            {" "}
            Acompanhe as ações, campanhas e histórias do Vozes das Ruas SM
            através das nossas redes sociais.{" "}
          </p>{" "}
          <a
            href="https://www.instagram.com/vozesdasruasm/"
            target="_blank"
            rel="noreferrer"
            className="button button--light"
          >
            {" "}
            Seguir no Instagram{" "}
          </a>{" "}
        </div>{" "}
        <div className="social__handle">
          <img
            src={logo}
            alt="Vozes das Ruas"
            className="social__handle__logo"
          />
        </div>{" "}
      </div>{" "}
    </section>{" "}
    <section className="cta">
      {" "}
      <div className="container cta__content">
        {" "}
        <span className="eyebrow">FAÇA PARTE</span> <h2> Toda ajuda conta. </h2>{" "}
        <p>
          {" "}
          Existem muitas formas de contribuir com o Vozes das Ruas. Doe, seja
          voluntário ou simplesmente compartilhe essa causa.{" "}
        </p>{" "}
        <a href="#como-ajudar" className="button button--dark">
          {" "}
          Quero ajudar{" "}
        </a>{" "}
      </div>{" "}
    </section>{" "}
  </>
);
