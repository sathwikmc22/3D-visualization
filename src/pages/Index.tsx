import { CarConfigurator } from "../components/CarConfigurator";
import heroImage from "@/assets/hero-car.jpg";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Toyota Fortuner
            </span>
            <br />
            <span className="text-4xl md:text-5xl">Configurator</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Design your premium full-size SUV with real-time 3D visualization. 
            Choose from authentic paint finishes, rugged accessories, and premium upgrades.
          </p>
          <button 
            onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-automotive bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-glow transition-all duration-300"
          >
            Start Customizing
          </button>
        </div>
      </section>

      {/* Configurator Section */}
      <section id="configurator" className="min-h-screen">
        <CarConfigurator />
      </section>
    </main>
  );
};

export default Index;
