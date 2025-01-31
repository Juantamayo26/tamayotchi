import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  etoroUSDData,
  a2censoCOPData,
  bricksaveUSDData,
  triiCOPData,
  xtbUSDData,
} from "@/data";

export default function RetroWebpage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [totalBalanceUSD, setTotalBalanceUSD] = useState(0);
  const [totalBalanceCOP, setTotalBalanceCOP] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        const rate = data.rates.COP;
        setExchangeRate(rate);

        const usdTotal = [...etoroUSDData, ...bricksaveUSDData, ...xtbUSDData].reduce(
          (sum, investment) => sum + investment.amount,
          0
        );

        const copTotal = [...a2censoCOPData, ...triiCOPData].reduce(
          (sum, investment) => sum + investment.amount,
          0
        );

        const copToUSD = copTotal / rate;
        setTotalBalanceUSD(usdTotal + copToUSD);
        setTotalBalanceCOP(copTotal + usdTotal * rate);
      } catch (error) {
        console.error("ERROR_FETCHING_EXCHANGE_RATE:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`font-mono ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
      } min-h-screen transition-colors duration-300 relative`}
    >
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "opacity-10" : "opacity-5"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${
              isDarkMode ? "#374151" : "#9CA3AF"
            } 1px, transparent 1px),
            linear-gradient(to bottom, ${
              isDarkMode ? "#374151" : "#9CA3AF"
            } 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} p-4`}>
          <header className="mb-8 relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-0 right-0"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
            <h1 className="text-2xl font-bold mb-2">TAMAYOTCHI</h1>
            <p className="mb-4"></p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Version: v0.1.0</p>
                <p>Updated: 18/09/2024</p>
              </div>
              <div>
                <p>Author: Juan Tamayo</p>
                <p>Visitor Count: 8</p>
              </div>
            </div>
          </header>

          <div
            className={`text-center p-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded-lg`}
          >
            <h3 className="text-xl font-bold mb-2">Total Portfolio Balance</h3>
            <p className="text-lg">
              Total in USD: $
              {totalBalanceUSD.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-lg">
              Total in COP: $
              {totalBalanceCOP.toLocaleString("es-CO", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-sm mt-2">
              Current Exchange Rate: 1 USD ={" "}
              {exchangeRate.toLocaleString("es-CO", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              COP
            </p>
          </div>

          <nav className="mb-8">
            <div
              className={`p-6 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              } rounded-lg`}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                INVESTMENT PLATFORMS
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div
                  className={`border rounded-lg p-6 ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-200"
                  }`}
                >
                  <h3 className="font-bold mb-4 text-center text-xl">
                    USD Investments
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                  {[
                    { path: 'etoro', name: 'eToro' },
                    { path: 'bricksave', name: 'Bricksave' },
                    { path: 'xtb', name: 'XTB' },
                  ].map(({ path, name }) => (
                    <li key={path}>
                      <a href={`/${path}`} className="text-blue-400 hover:text-blue-300 underline">
                        {name} Portfolio
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`border rounded-lg p-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                <h3 className="font-bold mb-4 text-center text-xl">
                  COP Investments
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {[
                    { path: 'a2censo', name: 'A2Censo' },
                    { path: 'trii', name: 'Trii' },
                  ].map(({ path, name }) => (
                    <li key={path}>
                      <a href={`/${path}`} className="text-blue-400 hover:text-blue-300 underline">
                        {name} Portfolio
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
          </nav>

          <main>
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-2">BLOG</h2>
              <p className="mb-4">
              </p>
              <p>
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
