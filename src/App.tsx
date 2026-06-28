import { FormEvent, useEffect, useState } from "react";
import { CaretDown, EnvelopeSimple, List, Phone, X } from "@phosphor-icons/react";
import logoUrl from "./assets/brand/lefin-logo.webp";
import heroDesktopUrl from "./assets/apple/hero-desktop.webp";
import heroMobileUrl from "./assets/apple/hero-mobile.webp";
import productsDesktopUrl from "./assets/apple/products-desktop.webp";
import productsMobileUrl from "./assets/apple/products-mobile.webp";
import nfpDesktopUrl from "./assets/apple/nfp-desktop.webp";
import nfpMobileUrl from "./assets/apple/nfp-mobile.webp";
import sourceDesktopUrl from "./assets/apple/source-desktop.webp";
import sourceMobileUrl from "./assets/apple/source-mobile.webp";
import {
  ContactFormErrors,
  ContactFormValues,
  contactTopics,
  faqItems,
  heroContent,
  navItems,
  nfpContent,
  nfpFeatures,
  productContent,
  productStages,
  promiseItems,
  sourceContent,
  validateContactForm
} from "./siteContent";

const emptyForm: ContactFormValues = {
  name: "",
  phone: "",
  topic: "",
  message: ""
};

type ResponsiveImageProps = {
  desktop: string;
  mobile: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

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

function ResponsiveImage({ desktop, mobile, alt, className, loading = "lazy" }: ResponsiveImageProps) {
  return (
    <picture className={className}>
      <source media="(max-width: 899px)" srcSet={mobile} />
      <img src={desktop} alt={alt} loading={loading} decoding="async" />
    </picture>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <a className="brand-mark" href="#top" aria-label="Lefin 乐芬首页">
          <img src={logoUrl} alt="Lefin 乐芬" />
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href="tel:4008084066">
          <Phone size={15} weight="bold" />
          <span>400-8084066</span>
        </a>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label="打开导航菜单"
          onClick={() => setOpen(true)}
        >
          <List size={22} weight="bold" />
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

function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <h1>{heroContent.title}</h1>
        <p>{heroContent.subtitle}</p>
        <div className="cta-row" aria-label="首页行动">
          <a href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</a>
          <a href={heroContent.secondaryCta.href}>{heroContent.secondaryCta.label}</a>
        </div>
      </div>
      <ResponsiveImage
        desktop={heroDesktopUrl}
        mobile={heroMobileUrl}
        alt={heroContent.alt}
        className="hero-media"
        loading="eager"
      />
    </section>
  );
}

function ProductSection() {
  return (
    <section className="showcase-section product-section" id="products">
      <div className="section-copy centered">
        <h2>{productContent.title}</h2>
        <p>{productContent.subtitle}</p>
      </div>
      <ResponsiveImage
        desktop={productsDesktopUrl}
        mobile={productsMobileUrl}
        alt={productContent.alt}
        className="showcase-media"
      />
      <div className="stage-row" aria-label="乐芬产品段位">
        {productStages.map((stage) => (
          <article key={stage.stage}>
            <strong>{stage.stage}</strong>
            <span>{stage.age}</span>
            <h3>{stage.name}</h3>
            <p>{stage.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NfpSection() {
  return (
    <section className="showcase-section nfp-section" id="nfp">
      <div className="section-copy centered">
        <h2>{nfpContent.title}</h2>
        <p>{nfpContent.subtitle}</p>
      </div>
      <ResponsiveImage desktop={nfpDesktopUrl} mobile={nfpMobileUrl} alt={nfpContent.alt} className="showcase-media" />
      <div className="feature-row" aria-label="NFP工艺要点">
        {nfpFeatures.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SourceSection() {
  return (
    <section className="source-section" id="source">
      <ResponsiveImage
        desktop={sourceDesktopUrl}
        mobile={sourceMobileUrl}
        alt={sourceContent.alt}
        className="source-media"
      />
      <div className="source-copy">
        <h2>{sourceContent.title}</h2>
        <p>{sourceContent.subtitle}</p>
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="promise-section" id="promise">
      <div className="section-copy centered">
        <h2>少一点复杂，多一点确定。</h2>
        <p>围绕真实包装、清晰工艺和可触达服务，建立官网表达。</p>
      </div>
      <div className="promise-grid">
        {promiseItems.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqContactSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section className="faq-contact-section" id="contact">
      <div className="faq-column">
        <div className="section-copy left">
          <h2>常见问题。</h2>
          <p>保留必要信息，让选择和使用更清楚。</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <article className="faq-item" key={item.question}>
                <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
                  <span>{item.question}</span>
                  <CaretDown size={18} weight="bold" />
                </button>
                {open ? <p>{item.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>

      <div className="contact-column">
        <div className="section-copy left">
          <h2>联系乐芬。</h2>
          <p>产品、渠道与售后问题，我们会尽快跟进。</p>
        </div>
        <div className="contact-methods">
          <a href="tel:4008084066">
            <Phone size={22} weight="bold" />
            <span>400-808 4066</span>
          </a>
          <a href="mailto:support@lefin.com.cn">
            <EnvelopeSimple size={22} weight="bold" />
            <span>support@lefin.com.cn</span>
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
              {contactTopics.map((topic) => (
                <option value={topic} key={topic}>
                  {topic}
                </option>
              ))}
            </select>
            {errors.topic ? <small>{errors.topic}</small> : null}
          </label>
          <label>
            <span>留言内容</span>
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
      <div>
        <strong>Lefin 乐芬</strong>
        <p>© 2026 Lefin 乐芬. All Rights Reserved.</p>
      </div>
      <nav aria-label="页脚导航">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/lefin-site.md">Markdown 内容</a>
      </nav>
      <p>沪ICP备202406xxxx号-1</p>
    </footer>
  );
}

export default function App() {
  useHashScroll();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductSection />
        <NfpSection />
        <SourceSection />
        <PromiseSection />
        <FaqContactSection />
      </main>
      <Footer />
    </>
  );
}
