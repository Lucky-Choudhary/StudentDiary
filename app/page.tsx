import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center">
        <div className="hero-gradient rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AdminPro
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your all-in-one solution for efficient team management, data analytics, and secure administration. Streamline your workflow with our powerful dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="button-animate">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="feature-card group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Team Management</h3>
          <p className="text-muted-foreground">
            Efficiently manage your team members, roles, and permissions with our intuitive interface.
          </p>
        </div>

        <div className="feature-card group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Advanced Analytics</h3>
          <p className="text-muted-foreground">
            Gain valuable insights with real-time analytics and customizable reports.
          </p>
        </div>

        <div className="feature-card group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Enterprise Security</h3>
          <p className="text-muted-foreground">
            Protect your data with enterprise-grade security features and compliance tools.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center gap-8 text-center">
        <div className="cta-card rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your administration?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of organizations using AdminPro to streamline their operations.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="button-animate">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
