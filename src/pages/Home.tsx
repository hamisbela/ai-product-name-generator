import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, Rocket, Star, Lightbulb } from 'lucide-react';
import { genAI } from '@/lib/gemini';

export default function Home() {
  const [description, setDescription] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateNames = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate 5 creative, memorable, and marketable product names based on this description: ${description}. The names should be unique, catchy, and easy to remember. Consider brand appeal, pronunciation, and domain availability. Each name should be 1-3 words maximum. Return only the names, one per line, without any additional text or explanations.`;
      
      const result = await model.generateContent(prompt);
      const nameList = result.response.text().split('\n').filter(name => name.trim());
      setNames(nameList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating product names');
      setNames([]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text leading-tight">
            AI Product Name Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Generate unique, memorable names for your products in seconds! 🚀
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your product, its features, target audience, and industry..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-orange-400"
              />
              
              <Button 
                onClick={generateNames}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Generate Names ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {names.length > 0 && (
          <div className="space-y-4 mb-12">
            {names.map((name, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
                <div className="flex justify-between items-center gap-4">
                  <p className="text-lg flex-grow">{name}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(name, index)}
                    className="flex items-center gap-2 min-w-[120px] hover:bg-orange-50"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Copied! ✅</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-orange-500" />
            <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              Free AI Product Name Generator: Create Perfect Product Names in Seconds ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Need the perfect name for your product? Our free AI-powered product name generator
                combines cutting-edge artificial intelligence with creative expertise to help you
                create unique, memorable names that resonate with your target market.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-orange-500" />
                  Why Choose Our Free AI Product Name Generator? 🎯
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🚀</span>
                    <span>Instant generation of unique and memorable product names</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered technology that understands market trends and consumer appeal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Save time and resources in your product launch process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Multiple creative options to choose from</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with professional-quality results</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                  The Power of AI in Product Naming 💫
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI technology analyzes successful product names, understands market trends,
                  and combines this knowledge with your specific product context. This results
                  in names that are:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span>📈</span> Memorable and distinctive
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎯</span> Market-ready
                  </li>
                  <li className="flex items-center gap-2">
                    <span>💡</span> Brand-aligned
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌟</span> Consumer-friendly
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Perfect For Every Product 🏢</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI product name generator is perfect for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Tech products and apps</li>
                  <li>• Consumer goods and electronics</li>
                  <li>• Food and beverage items</li>
                  <li>• Beauty and wellness products</li>
                  <li>• Software and digital services</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Tips for Great Product Names 🎯</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Be specific about your product's key features</li>
                  <li>Include target market and positioning</li>
                  <li>Consider industry trends and competitors</li>
                  <li>Think about trademark and domain availability</li>
                  <li>Test different product descriptions</li>
                </ol>
              </div>
            </div>
          </article>
        </div>

        <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-orange-500" />
            <h2 className="text-2xl font-bold">Love Our Tool? Support Its Growth! 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your support helps us maintain our AI infrastructure, improve the tool's capabilities,
              and keep it accessible to everyone. Every coffee counts! ☕
            </p>
            <div className="pt-2">
              <a
                href="https://roihacks.gumroad.com/coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Coffee className="mr-2 h-5 w-5" />
                  Buy Us a Coffee ☕
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}