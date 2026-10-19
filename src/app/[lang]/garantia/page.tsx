import GarantiaEnviosSection from '@/components/home/GarantiaEnviosSection';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function GarantiaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === 'en' ? 'en' : 'es') as 'es' | 'en';

  return (
    <div className="bg-[#0B0B0B] text-[#F4EADB] min-h-[calc(100vh-64px)] pt-16 flex items-center justify-center">
      <div className="w-full py-4 sm:py-6">
        <GarantiaEnviosSection lang={lang} />
      </div>
    </div>
  );
}
