import { FormEvent, useEffect, useState } from "react";
import {
  CaretDown,
  CheckCircle,
  Drop,
  EnvelopeSimple,
  Factory,
  Funnel,
  HouseLine,
  Leaf,
  List,
  Phone,
  ShieldCheck,
  Snowflake,
  ThermometerSimple,
  X
} from "@phosphor-icons/react";
import logoUrl from "./assets/brand/lefin-logo.webp";
import heroBannerUrl from "./assets/hero/lefin-home-hero.webp";
import valioLakeUrl from "./assets/generated/valio-lake.webp";
import stage1ProductUrl from "./assets/products/lefin-stage-1.webp";
import stage2ProductUrl from "./assets/products/lefin-stage-2.webp";
import stage3ProductUrl from "./assets/products/lefin-stage-3.webp";
import {
  ContactFormErrors,
  ContactFormValues,
  contactHighlights,
  faqItems,
  heroProofs,
  navItems,
  processSteps,
  productStages,
  ratioHighlights,
  validateContactForm,
  valioHighlights,
  valioPoints
} from "./siteContent";

const emptyForm: ContactFormValues = {
  name: "",
  phone: "",
  topic: "",
  message: ""
};

const processIcons = [Drop, Funnel, Factory, ThermometerSimple, ThermometerSimple, Snowflake];
const valioIcons = [HouseLine, Leaf, ShieldCheck, Drop];
const productImageUrls = [stage1ProductUrl, stage2ProductUrl, stage3ProductUrl];
const productAltTexts = [
  "乐芬一段婴儿配方奶粉 0-6月龄",
  "乐芬二段较大婴儿配方奶粉 6-12月龄",
  "乐芬三段幼儿配方奶粉 12-36月龄"
];

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(id));
      window.requestAnimationFrame(() => target?.scrollIntoView?.({ block: "start" }));
    };

    const timer = window.setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand-link" href="#top" aria-label="Lefin 乐芬首页">
          <img src={logoUrl} alt="Lefin 乐芬" />
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-contact" aria-label="联系方式">
          <a href="tel:4008084066">
            <Phone size={16} weight="bold" />
            <span>400-8084066</span>
          </a>
          <a href="mailto:support@lefin.com.cn">
            <EnvelopeSimple size={16} weight="bold" />
            <span>support@lefin.com.cn</span>
          </a>
        </div>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label="打开导航菜单"
          onClick={() => setOpen(true)}
        >
          <List size={23} weight="bold" />
        </button>
      </div>

      {open ? (
        <div className="mobile-nav-shell" role="dialog" aria-label="移动端导航">
          <div className="mobile-nav-panel">
            <div className="mobile-nav-top">
              <img src={logoUrl} alt="Lefin 乐芬" />
              <button
                className="icon-button"
                type="button"
                aria-label="关闭导航菜单"
                onClick={() => setOpen(false)}
              >
                <X size={22} weight="bold" />
              </button>
            </div>
            <nav aria-label="移动导航链接">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href="tel:4008084066" onClick={() => setOpen(false)}>
                400-8084066
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero-section" id="top" aria-label="乐芬科学配方，陪伴成长每一步">
        <img
          className="hero-banner"
          src={heroBannerUrl}
          alt="乐芬科学配方，陪伴成长每一步，一段二段三段婴幼儿配方奶粉产品展示"
        />
      </section>
      <section className="hero-proof-section" aria-label="乐芬品牌要点">
        <div className="shell hero-proof-grid">
          {heroProofs.map((proof) => (
            <article className="hero-proof" key={proof.title}>
              <strong>{proof.title}</strong>
              <span>{proof.body}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProcessSection() {
  return (
    <section className="process-section page-section" id="nfp">
      <div className="shell">
        <div className="section-heading left">
          <h2>湿法工艺全流程，高占比液态成粉</h2>
          <p>从源头鲜奶，每一步都为保留营养价值</p>
        </div>

        <div className="process-flow">
          {processSteps.map((step, index) => {
            const Icon = processIcons[index];
            return (
              <article className="process-step" key={step.title}>
                <div className="process-icon">
                  <Icon size={35} weight="regular" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <small>{step.detail}</small>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ValioSection() {
  return (
    <section className="valio-section page-section" id="story">
      <div className="valio-media">
        <img src={valioLakeUrl} alt="芬兰湖区与国旗，象征 Valio 奶源地" />
      </div>
      <div className="shell valio-grid">
        <div aria-hidden="true" />
        <div className="valio-copy">
          <div className="valio-title-row">
            <div>
              <h2>Valio芬兰奶源，纯净之源</h2>
              <p>
                源自芬兰百年乳企 Valio，北纬纯净奶源带，自有牧场，从牧场到工厂全程可追溯。
              </p>
              <div className="valio-highlight-list" aria-label="Valio奶源优势">
                {valioHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="valio-badge">
              <strong>Valio</strong>
              <span>来自芬兰</span>
              <small>Since 1905</small>
            </div>
          </div>

          <div className="valio-points">
            {valioPoints.map((point, index) => {
              const Icon = valioIcons[index];
              return (
                <article className="valio-point" key={point.title}>
                  <Icon size={30} weight="regular" />
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                  <small>{point.detail}</small>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="products-section page-section" id="products">
      <div className="shell">
        <div className="section-heading left">
          <h2>科学分段，精准满足成长所需</h2>
          <p>针对不同成长阶段的营养需求，科学配比</p>
        </div>

        <div className="product-lineup">
          <div className="product-cans" aria-label="乐芬一段、二段、三段婴幼儿配方奶粉产品线">
            {productStages.map((stage, index) => (
              <figure className={`product-can-card ${stage.accent}`} key={`${stage.stage}-product`}>
                <img src={productImageUrls[index]} alt={productAltTexts[index]} />
                <figcaption>
                  <strong>{stage.stage}</strong>
                  <span>{stage.age}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="stage-cards">
            {productStages.map((stage) => (
              <article className={`stage-card ${stage.accent}`} key={stage.stage}>
                <div className="stage-title">
                  <strong>{stage.stage}</strong>
                  <span>{stage.age}</span>
                </div>
                <p className="stage-summary">{stage.summary}</p>
                <ul>
                  {stage.points.map((point) => (
                    <li key={point}>
                      <CheckCircle size={15} weight="fill" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="stage-tags" aria-label={`${stage.stage}产品特点`}>
                  {stage.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RatioSection() {
  return (
    <section className="ratio-section page-section">
      <div className="shell">
        <div className="section-heading left compact">
          <h2>配方主料配比</h2>
          <p>科学配比核心营养，给宝宝更好的营养支持</p>
        </div>

        <div className="ratio-grid">
          <article className="ratio-card">
            <span className="ratio-label">1段</span>
            <strong>4 : 1 : 1</strong>
            <p>乳清蛋白 : 酪蛋白 : 乳脂</p>
            <div className="droplet-row">
              <Drop className="drop-large" size={82} weight="fill" />
              <Drop className="drop-medium" size={58} weight="fill" />
              <Drop className="drop-small" size={38} weight="fill" />
            </div>
          </article>
          <article className="ratio-card">
            <span className="ratio-label green">2段 / 3段</span>
            <strong>5 : 5 : 2</strong>
            <p>乳清蛋白 : 酪蛋白 : 乳脂</p>
            <div className="droplet-row">
              <Drop className="drop-large" size={82} weight="fill" />
              <Drop className="drop-medium" size={58} weight="fill" />
              <Drop className="drop-small" size={38} weight="fill" />
            </div>
          </article>
        </div>
        <div className="ratio-highlights">
          {ratioHighlights.map((item) => (
            <article className="ratio-highlight" key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="ratio-note">*以上配比为配方主料比例，具体详情请参考产品包装。</p>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section page-section">
      <div className="shell">
        <div className="section-heading left compact">
          <h2>常见问答</h2>
        </div>

        <div className="faq-grid">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <article className="faq-item" key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <CaretDown size={18} weight="bold" />
                </button>
                {open ? <p>{item.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <section className="contact-section" id="about">
      <div className="shell contact-grid">
        <div className="contact-info">
          <h2>
            如需了解更多，
            <span>欢迎与我们联系</span>
          </h2>
          <div className="contact-methods">
            <a href="tel:4008084066">
              <Phone size={36} weight="regular" />
              <span>
                <strong>400-808 4066</strong>
                <small>周一至周日 9:00-18:00</small>
              </span>
            </a>
            <a href="mailto:support@lefin.com.cn">
              <EnvelopeSimple size={36} weight="regular" />
              <span>
                <strong>support@lefin.com.cn</strong>
                <small>我们将尽快回复您</small>
              </span>
            </a>
          </div>
          <div className="contact-highlights" aria-label="服务支持范围">
            {contactHighlights.map((item) => (
              <article key={item.title}>
                <CheckCircle size={17} weight="fill" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
              </article>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h3>在线留言</h3>
          <div className="form-row">
            <label>
              <span>姓名</span>
              <input
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="您的姓名"
              />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label>
              <span>手机号码</span>
              <input
                value={values.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="手机号码"
              />
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>
            <label>
              <span>选择咨询类型</span>
              <select value={values.topic} onChange={(event) => updateField("topic", event.target.value)}>
                <option value="">选择咨询类型</option>
                <option value="产品咨询">产品咨询</option>
                <option value="渠道合作">渠道合作</option>
                <option value="售后服务">售后服务</option>
              </select>
              {errors.topic ? <small>{errors.topic}</small> : null}
            </label>
          </div>
          <label className="message-field">
            <span>请填写您的留言内容</span>
            <textarea
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="请填写您的留言内容"
            />
            {errors.message ? <small>{errors.message}</small> : null}
          </label>
          {submitted ? <p className="success-message">留言已提交，我们会尽快联系您。</p> : null}
          <button className="submit-button" type="submit">
            提交
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <nav aria-label="页脚导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <p>© 2024 Lefin 乐芬. All Rights Reserved.</p>
        <p>沪ICP备202406xxxx号-1</p>
      </div>
    </footer>
  );
}

export default function App() {
  useHashScroll();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProcessSection />
        <ValioSection />
        <ProductsSection />
        <RatioSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
