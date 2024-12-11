import React from 'react';

// Reusable Button Component
const Button = ({ href, children }) => (
  <a 
    href={href} 
    style={{ 
      padding: '15px 30px', 
      fontSize: '1.2rem', 
      background: 'linear-gradient(to right, #ff426c, #ff4b2b)', 
      color: '#fff', 
      border: 'none', 
      borderRadius: '30px', 
      textDecoration: 'none', 
      cursor: 'pointer' 
    }}
  >
    {children}
  </a>
);


// Reusable Product Card Component
const ProductCard = ({ imageSrc, title, description }) => (
  <div style={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
    <img src={imageSrc} alt={title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem' }}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

// Reusable Event Card Component
const EventCard = ({ imageSrc, title, description }) => (
  <div style={{ width: '300px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
    <img src={imageSrc} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem' }}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

// Hero Section
const Hero = () => (
  <section 
    style={{ 
      backgroundImage: 'url(https://www.vintagemillwerks.com/wp-content/uploads/2020/11/tSRJI8bdqmIKmXFGS8xUohNL95netAJO1606168370.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '500px', 
      color: '#fff', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px' 
    }}
  >
    <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>Support Artisans, Embrace Tradition</h1>
    <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
      Discover authentic handmade textiles and handicrafts from India’s finest artisans.
    </p>
    <Button href="/productsList">Shop Now</Button>
  </section>
);

// About Section
const About = () => (
  <section style={{ textAlign: 'center', padding: '50px' }}>
    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Empowering Rural Artisans</h2>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
      Textiles and handicrafts form a major pillar of the rural economy. Our mission is to bring the talent of India's artisans to the global stage. 
      Artisans can register, upload their products, showcase their skills, and organize self-created events. Public users can browse and purchase unique, one-of-a-kind products.
    </p>
  </section>
);

// Featured Products Section
const FeaturedProducts = () => (
  <section style={{ padding: '50px', backgroundColor: '#fff' }}>
    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>Featured Products</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {['Handwoven Saree', 'Intricate Embroidery Kurti', 'Handmade Pottery'].map((product, index) => (
        <ProductCard 
          key={index} 
          imageSrc="https://th.bing.com/th/id/OIP.hkvha8UCZbaFSsx2YkPBmAHaFS?w=266&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
          title={product} 
          description="Explore the latest creations from skilled artisans." 
        />
      ))}
    </div>
  </section>
);

// Call-to-Action Section for Artisan Registration
const ArtisanCTA = () => (
  <section style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9' }}>
    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Are You an Artisan?</h2>
    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
      Join our platform to showcase your handcrafted products, track your earnings, and participate in global exhibitions.
    </p>
    <Button href="/artisian-register">Register as an Artisan</Button>
  </section>
);

// Events Section
const Events = () => (
  <section style={{ padding: '50px' }}>
    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>Events and Highlights</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {['Local Handicraft Fair', 'Online Exhibition', 'Artisan of the Month'].map((event, index) => (
        <EventCard 
          key={index} 
          imageSrc="https://th.bing.com/th?id=OIF.WH16cecIR3Mc%2b4Dut0JbVg&w=280&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
          title={event} 
          description="Don't miss out on this exciting event!" 
        />
      ))}
    </div>
  </section>
);

// Footer Section
const Footer = () => (
  <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
    <p>&copy; 2024 HandmadeHub. All Rights Reserved.</p>
  </footer>
);

// Home Page Component
const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', color: '#333' }}>
      <Hero />
      <About />
      <FeaturedProducts />
      <ArtisanCTA />
      <Events />
      <Footer />
    </div>
  );
};

export default Home;
