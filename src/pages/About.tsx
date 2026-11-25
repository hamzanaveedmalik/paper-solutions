import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const About = () => {
  useSEO({
    title: 'About Us - Our Story, Founders & Values',
    description:
      'Learn about Forth & Vale - our story, founders, and commitment to quality leather goods manufacturing. Born from a shared vision of exceptional craftsmanship.',
    keywords:
      'about forth and vale, leather goods founders, leather manufacturing company, UK leather manufacturer, quality leather goods',
    ogTitle: 'About Us - Our Story & Founders | Forth & Vale',
    ogDescription:
      'Born from a vision to create exceptional leather goods. Learn about our founders, story, and commitment to quality craftsmanship.',
  });

  const founders = [
    {
      name: 'Muhammad Umer',
      role: 'CEO',
      description:
        'Product development specialist focused on innovation and design excellence in leather goods.',
    },
    {
      name: 'Hamza Naveed Malik',
      role: 'CTO',
      description:
        'Visionary leader with a passion for quality craftsmanship and sustainable business practices.',
    },
    {
      name: 'Ali Arsala Sher',
      role: 'COO',
      description:
        'Operations expert ensuring every product meets our exacting standards from concept to delivery.',
    },
    {
      name: 'Noman Khan',
      role: 'CMO',
      description:
        'Marketing strategist focused on brand growth, customer acquisition, and market expansion.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Born from a shared vision of creating exceptional leather goods,
              Forth & Vale was founded by four passionate entrepreneurs who
              believe in the power of quality craftsmanship and authentic
              partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              What started as a conversation between four friends about the lack
              of truly reliable leather goods manufacturers has evolved into a
              company trusted by brands across the UK, EU, and USA. We
              recognized that businesses needed more than just a supplier – they
              needed a manufacturing partner who understood their vision and
              could deliver consistently.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, Forth & Vale stands as a testament to what's possible when
              expertise, innovation, and genuine care come together. Every
              product we create carries our commitment to excellence and our
              founders' shared belief that quality never goes out of style.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">
            Meet Our Founders
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {founder.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{founder.name}</h3>
                  <p className="text-primary font-medium mb-4">
                    {founder.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {founder.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description:
                  'Every product undergoes our 27-point quality control process to ensure excellence.',
              },
              {
                title: 'Transparent Partnership',
                description:
                  'We believe in open communication and building long-term relationships with our clients.',
              },
              {
                title: 'Sustainable Practices',
                description:
                  'Committed to responsible sourcing and environmentally conscious manufacturing.',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We'd love to learn about your project and discuss how we can bring
            your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#calendar" className="inline-block">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium">
                Schedule a Call
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
