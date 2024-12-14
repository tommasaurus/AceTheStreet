import Image from "next/image";

export function PartnersSection() {
  const banks = [
    { 
      name: "Goldman Sachs", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
      width: 180 
    },
    { 
      name: "Evercore", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Evercore_Logo.svg",
      width: 160
    },
    { 
      name: "RBC", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/RBC_Royal_Bank.svg",
      width: 120 
    },
    { 
      name: "Morgan Stanley", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg",
      width: 180 
    },
    { 
      name: "JP Morgan", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg",
      width: 180 
    },
  ];

  const universities = [
    { 
      name: "Harvard", 
      logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
      width: 80 
    },
    { 
      name: "Stanford", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Stanford_University_Block_S_logo.svg",
      width: 80 
    },
    { 
      name: "Wharton", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Penn_Wharton_Logo.svg",
      width: 200 
    },
    { 
      name: "MIT", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
      width: 120 
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          <div className="space-y-8">
            <h3 className="text-center text-sm font-semibold text-blue-900/70 uppercase tracking-wider">
              Questions from Leading Investment Banks
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              {banks.map((bank) => (
                <div key={bank.name} className="h-12 flex items-center grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={bank.width}
                    height={40}
                    style={{ maxHeight: '40px', width: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-center text-sm font-semibold text-blue-900/70 uppercase tracking-wider">
              Used by Students From
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {universities.map((university) => (
                <div key={university.name} className="h-16 flex items-center grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={university.logo}
                    alt={university.name}
                    width={university.width}
                    height={64}
                    style={{ maxHeight: '64px', width: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}