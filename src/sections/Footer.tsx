import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#000814] border-t border-white/5">
      <div className="container-custom pb-8">
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-body text-xs text-center md:text-left">
            {t('footer.copyright', {
              year: new Date().getFullYear(),
            })}
          </p>

          <p className="text-white/40 font-body text-xs flex items-center gap-1">
            {t('footer.designedWith')}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            {t('footer.designedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}