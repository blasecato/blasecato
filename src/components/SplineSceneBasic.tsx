import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { useTranslation } from 'react-i18next';

export function SplineSceneBasic() {
  const { t } = useTranslation();

  return (
    <Card className="w-full h-[500px] bg-foreground/[0.04] relative overflow-hidden border-foreground/10">
      <Spotlight size={300} />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg">
            {t('about.description1')}
            <br /><br />
            {t('about.description2')}
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
