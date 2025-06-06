import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-headline text-xl text-neutral-50 mb-4">Wedsite Wonders</h4>
            <p className="text-sm">Creating beautiful wedding invitations that celebrate your love story with elegance and style.</p>
          </div>
          <div>
            <h4 className="font-headline text-lg text-neutral-50 mb-4">Templates</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#templates" className="hover:text-primary transition-colors">Classic Elegance</Link></li>
              <li><Link href="#templates" className="hover:text-primary transition-colors">Modern Minimalist</Link></li>
              <li><Link href="#templates" className="hover:text-primary transition-colors">Rustic Romance</Link></li>
              <li><Link href="#templates" className="hover:text-primary transition-colors">Garden Party</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg text-neutral-50 mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-primary transition-colors">RSVP Management</Link></li>
              <li><Link href="#features" className="hover:text-primary transition-colors">Photo Galleries</Link></li>
              <li><Link href="#showcase" className="hover:text-primary transition-colors">3D Animations</Link></li>
              <li><Link href="#features" className="hover:text-primary transition-colors">Mobile Responsive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg text-neutral-50 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Wedsite Wonders. All rights reserved. Made with ❤️ for couples everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
