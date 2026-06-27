import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CaretDown,
  CheckCircle,
  Cow,
  Drop,
  EnvelopeSimple,
  Factory,
  Flask,
  Leaf,
  List,
  MapPin,
  Phone,
  ShieldCheck,
  X
} from "@phosphor-icons/react";
import logoUrl from "./assets/brand/lefin-logo.webp";
import farmUrl from "./assets/generated/finnish-farm.webp";
import heroFactoryUrl from "./assets/generated/hero-factory.webp";
import productUrl from "./assets/generated/lefin-product-stage3.webp";
import {
  ContactFormErrors,
  ContactFormValues,
  faqItems,
  navItems,
  processSteps,
  productStages,
  validateContactForm
} from "./siteContent";

const emptyForm: ContactFormValues = {
  name: "",
  email: "",
  message: ""
};

const iconForStep = [Drop, Factory, Flask, ShieldCheck];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="desktop-nav desktop-nav-left" aria-label="主导航">
          {navItems.slice(0, 2).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="brand-link" href="#top" aria-label="Lefin 乐芬首页">
          <img src={logoUrl} alt="Lefin 乐芬" />
        </a>

        <nav className="desktop-nav desktop-nav-right" aria-label="辅助导航">
          {navItems.slice(2).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          联系我们
        </a>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label="打开导航菜单"
          onClick={() => setOpen(true)}
        >
          <List size={24} weight="bold" />
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
              <a href="#contact" onClick={() => setOpen(false)}>
                联系我们
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
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="section-kicker">NFP Not From Powder</p>
        <h1 aria-label="拒绝复溶，重构鲜活">
          <span>拒绝复溶，</span>
          <span>重构鲜活</span>
        </h1>
        <p className="hero-lede">
          源自芬兰 Valio 的纯净奶源，以高占比液态湿法工艺一次性成粉，让配方从源头保持鲜活。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#nfp">
            了解 NFP 工艺
            <ArrowRight size={18} weight="bold" />
          </a>
          <a className="secondary-action" href="#products">
            查看乐芬婴配
          </a>
        </div>
        <dl className="hero-stats" aria-label="乐芬核心数据">
          <div>
            <dt>90%</dt>
            <dd>一二段液态成粉率</dd>
          </div>
          <div>
            <dt>98%</dt>
            <dd>三段液态成粉率</dd>
          </div>
          <div>
            <dt>Valio</dt>
            <dd>芬兰乳品工厂</dd>
          </div>
        </dl>
      </div>

      <div className="hero-media">
        <img src={heroFactoryUrl} alt="乐芬湿法工艺与产品罐展示" />
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="story-section page-band" id="story">
      <div className="section-heading">
        <p className="section-kicker">Finnish Origin</p>
        <h2>乐芬和快乐的奶牛</h2>
        <p>
          Valio 农场的动物福利符合国际标准，健康的牛产出纯净、高品质的牛奶。乐芬将这份稳定奶源带入中国家庭。
        </p>
      </div>
      <div className="story-grid">
        <div className="story-media">
          <img src={farmUrl} alt="芬兰牧场与奶牛" />
        </div>
        <div className="story-copy">
          <div className="story-point">
            <Cow size={28} weight="duotone" />
            <div>
              <h3>Valio 奶源管理</h3>
              <p>牛奶质量严格监控，对抗生素残留零容忍，持续追求高等级奶源品质。</p>
            </div>
          </div>
          <div className="story-point">
            <Leaf size={28} weight="duotone" />
            <div>
              <h3>从自然到配方</h3>
              <p>以贴近自然的育儿理念为出发点，围绕蛋白质、脂肪、乳糖等营养吸收设计配方。</p>
            </div>
          </div>
          <div className="story-point">
            <ShieldCheck size={28} weight="duotone" />
            <div>
              <h3>原罐引进</h3>
              <p>全系列通过中国婴儿配方奶粉新国标二次注册，面向中国消费者提供清晰本地化标签。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="products-section" id="products">
      <div className="product-copy">
        <p className="section-kicker">Lefin Infant Formula</p>
        <h2>乐芬全段位婴幼儿配方奶粉</h2>
        <p>
          以三段产品为视觉代表，延展覆盖不同月龄阶段。产品图根据你提供的罐装实物重新优化，用于官网展示。
        </p>
        <div className="stage-list" aria-label="产品阶段">
          {productStages.map((item) => (
            <article className="stage-item" key={item.stage}>
              <span>{item.stage}</span>
              <h3>{item.age}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="product-visual">
        <img src={productUrl} alt="乐芬三段幼儿配方奶粉产品罐" />
      </div>
    </section>
  );
}

function NfpSection() {
  return (
    <section className="nfp-section page-band" id="nfp">
      <div className="section-heading">
        <p className="section-kicker">NFP Not From Powder</p>
        <h2>高占比液态湿法工艺</h2>
        <p>
          乐芬以液态奶源入料，减少复溶步骤，把「鲜活」落实到生产路径、配方比例与质量管理。
        </p>
      </div>

      <div className="process-grid">
        {processSteps.map((step, index) => {
          const Icon = iconForStep[index];
          return (
            <article className="process-step" key={step.title}>
              <Icon size={30} weight="duotone" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          );
        })}
      </div>

      <div className="ratio-panel" aria-label="液态入料配比">
        <div>
          <p>一、二段</p>
          <strong>4 : 1 : 1</strong>
          <span>脱盐乳清源液 / 脱脂牛乳 / 稀奶油</span>
        </div>
        <div>
          <p>三段</p>
          <strong>5 : 5 : 2</strong>
          <span>更契合 12 月龄后幼儿成长阶段</span>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="section-heading">
        <p className="section-kicker">Frequently Asked Questions</p>
        <h2 id="faq-title">常见问答</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <article className="faq-item" key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <CaretDown size={18} weight="bold" />
              </button>
              <p id={`faq-answer-${index}`} hidden={!isOpen}>
                {item.answer}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <section className="contact-section page-band" id="contact">
      <div className="contact-info" id="about">
        <p className="section-kicker">About Lefin China</p>
        <h2>上海乐玢国际贸易有限公司</h2>
        <p>
          成立于 2021 年，长期从事母婴食品进出口、销售业务以及电子商务，是芬兰 Lefin 乐芬婴幼儿配方奶粉的中国区总代理。
        </p>
        <ul className="contact-list">
          <li>
            <MapPin size={20} weight="duotone" />
            上海市金山区山阳镇山富东路 55 弄 4 号 1 幢 2 层
          </li>
          <li>
            <Phone size={20} weight="duotone" />
            400-8084066
          </li>
          <li>
            <EnvelopeSimple size={20} weight="duotone" />
            support@lefin.com.cn
          </li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={submitForm} noValidate>
        <label>
          姓名
          <input
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <label>
          Email
          <input
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </label>
        <label>
          咨询内容
          <textarea
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <span className="field-error">{errors.message}</span> : null}
        </label>
        <button type="submit">发送信息</button>
        {hasErrors ? <p className="form-note">请完善表单后再提交。</p> : null}
        {submitted ? (
          <p className="form-success">
            <CheckCircle size={18} weight="fill" />
            信息已记录，我们会尽快联系您。
          </p>
        ) : null}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src={logoUrl} alt="Lefin 乐芬" />
        <p>Lefin 乐芬 | 源自芬兰 Valio，NFP 重构鲜活。</p>
      </div>
      <div className="footer-links">
        <a href="https://www.valio.com/" target="_blank" rel="noreferrer">
          Valio（维利奥）
        </a>
        <a href="https://www.valio.com.cn/" target="_blank" rel="noreferrer">
          蔚优中国
        </a>
        <a href="https://cloud.lefin.com.cn/" target="_blank" rel="noreferrer">
          乐芬云
        </a>
      </div>
      <p className="icp">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          沪ICP备2023025946号-4
        </a>
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StorySection />
        <ProductsSection />
        <NfpSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
