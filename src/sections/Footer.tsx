import { MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#000814] border-t border-white/5">
      <div className="container-custom pb-8">
        {/* Main Footer */}
       

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-body text-xs text-center md:text-left">
            © {new Date().getFullYear()} Infinity Classes. All Rights Reserved.
          </p>

          <p className="text-white/40 font-body text-xs flex items-center gap-1">
            Designed with{' '}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by Sarthak Deshmukh
            
          </p>
        </div>
      </div>
    </footer>
  );
}