import { Config } from "../Config";
import { Wallet } from "../model/Wallet";
import { equal, throws, ok } from 'assert'
import { IntentBuilder } from "../";
import { EthWallet } from "../model/data/EthWallet";
import { ERC20 } from "../model/data/ERC20";
import BigNumber = require("bn.js");

const privs = [
  '0x62d29230c55255d404f85cf45d2db438911a8e8c76b9e917656fdbd8c4adccf4',
  '0x5ef1dbf8ef171b33cd72a5d11b713442dcd2c70695753a0f6df9b38136e08d54',
  '0x6306c990056a965674edf80c7e1518d1c337abe005ffd7dcd17b25a2db0dfb2f',
  '0xadfc814c0e30d88889a5cf3701e8da4ea65fc15111f54591e6f0ee4aa129f40f',
  '0x2a050363f79a7da50302c2ed81a141f4307d056846339183c671d8defa10db33',
  '0x6de344483ec377e3262437805e3e9f290b1094d7c19bab52eca42bb471edc81a',
  '0x871cbb62ecf06d97185ca70e1722e51684db71066f43c672b6589d47c15d9cb3',
  '0x68159b0ce11c69e75aaa79286f4c6f9e11523f4c12631e608e6a6d60d57dbd94',
  '0x60b51acb27b07e5f8000ad8451469d1326d10357cad955ec4f5d5537ede0e9d8',
  '0x3a423f1c02a85be8641f67e36d91ae4089766ceb18bd7308c2e845d8e90fa705',
];

function bn (value: number) {
    return new BigNumber(value);
}

describe('IntentBuilder Test', () => {
  let testConfig;

  before(() => {
    testConfig = new Config("0xe814f48c2eaf753ae51c7c807e2b1736700126c58af556d78c7c6158d201a125", "0x4E0B13eDeE810702884b72DBE018579Cb2e4C6fA", 999);
  });
  describe("Should require to define a configuration", () => {
    it("Should fail if global is not defined and config not provided", () => {
        throws(() => new Wallet(privs[0]));
    });
    it("Should not fail if configuration is provided", () => {
        ok(new Wallet(privs[0], testConfig));
    });
    it("Should use the configuration defined as global", () => {
        testConfig.asDefault();
        ok(new Wallet(privs[0]));
    });
  });
  describe("Should manage wallets", () => {
    it("Should retrieve signer address", () => {
        const wallet = new Wallet(privs[1], testConfig);
        equal(wallet.signer, "0x001a825b7cdfcc40e981addb5b5952a1b3165643");
    });
    it("Should retrieve marmo address", () => {
        const wallet = new Wallet(privs[1], testConfig);
        equal(wallet.address, "0x04ec08d9bd5f9ede7524dfde561796563387d93a");
    });
  });
  describe("Should manage intents", () => {
    it("Should generate intent id (send ETH)", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withSalt("0x0000000000000000000000000000000000000000000000000000000000000000")
            .withIntentAction(new EthWallet().sendEth(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                1
            ))
            .withMinGasLimit(0)
            .withMaxGasLimit(bn(10).pow(bn(32)))
            .withExpiration(bn(10).pow(bn(24)))
            .build();

        equal(intent.id(wallet), "0xa6daa52099d4083291c39a4beb2579dbfda6d24393c5e49f2549f08e37739b74");
    });
    it("Should generate intent id (send tokens)", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withSalt("0x0000000000000000000000000000000000000000000000000000000000000000")
            .withIntentAction(new ERC20("0x6B0F919A5d450Fa5e6283Ff6178dC1FCd195FD2A").transfer(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                4
            ))
            .withMinGasLimit(0)
            .withMaxGasLimit(bn(10).pow(bn(32)))
            .withExpiration(1548030494)
            .build();

        equal(intent.id(wallet), "0xe34f44ab2514803ba5f1a4766f5fe1d6d012a9599c8e13843962366f04427198");
    });
    it("Should generate intent id with dependencies", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withDependencies(["0xa6daa52099d4083291c39a4beb2579dbfda6d24393c5e49f2549f08e37739b74"])
            .withIntentAction(new EthWallet().sendEth(
                "0x008d03067bcb29c5b35de2ee4a2fb88b965edf61",
                2
            ))
            .withMaxGasLimit(bn(10).pow(bn(32)))
            .withExpiration("1548069482")
            .build();

        equal(intent.id(wallet), "0x2cd48b6d072d54707850d17ca199e5c3ed8ecc3d626c78c872ac2a9e9b5f31ec");
    });
    it("Should sign intent", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withDependencies(["0xa6daa52099d4083291c39a4beb2579dbfda6d24393c5e49f2549f08e37739b74"])
            .withIntentAction(new EthWallet().sendEth(
                "0x008d03067bcb29c5b35de2ee4a2fb88b965edf61",
                2
            ))
            .withMaxGasLimit(bn(10).pow(bn(32)))
            .withExpiration("1548069482")
            .build();

        const signedIntent = wallet.sign(intent);

        equal(
            signedIntent.signature.join(),
            "0x29d321ce0d6d2f8a4070f4c54bf19917987d10aa7aff967eb70f995f45522ef501ae6eedc4f5cf12518bcb7894ec0345fef8860c288e319bf6a71c38fa617c091c"
        );
    });
  });
});
