import { Config } from "../Config";
import { Wallet } from "../model/Wallet";
import { equal, throws, ok } from 'assert'
import { IntentBuilder } from "../builder/IntentBuilder";
import { EthWallet } from "../model/data/EthWallet";
import { ERC20 } from "../model/data/ERC20";
import { BigNumber } from "bignumber.js";
import { WETH } from "../model/data/WETH";

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
    testConfig = new Config(
        "0xd586145101ec2c83174d91f2dd8df4b0cdb335f8f77935be590114916b535944",
        "0x68EA020095c1B3E58687cfA8eC2D631137Db28d7",
        "0x4E0B13eDeE810702884b72DBE018579Cb2e4C6fA",
        "0x6B0F919A5d450Fa5e6283Ff6178dC1FCd195FD2A"
    );
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
        equal(wallet.address, "0x213cf6b20b5cf65ea259393af64935aeecb0ae5e");
    });
  });
  describe("Should manage intents", () => {
    it("Should generate intent id (send ETH)", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withSalt("0x111151")
            .withIntentAction(new EthWallet().sendEth(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                1
            ))
            .withMaxGasLimit(0)
            .withMaxGasPrice(bn(10).pow(bn(32)))
            .withExpiration(bn(10).pow(bn(24)))
            .build();

        equal(intent.id(wallet), "0xe5e4e756b52ca2697f56a13bd4039d09885c56e051c54fbeff40076851d8ab76");
    });
    it("Should generate intent id (send tokens)", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withSalt("0x0000000000000000000000000000000000000000000000000000000000000000")
            .withIntentAction(new ERC20("0x6Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e1").transfer(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                4
            ))
            .withMaxGasLimit(0)
            .withMaxGasPrice(bn(10).pow(bn(32)))
            .withExpiration(1549218987)
            .build();

        equal(intent.id(wallet), "0x4c8965758ff35849a98a26d322198d65467cbf1205311377ec8d3639217e654b");
    });
    it("Should generate intent id (send WETH)", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withSalt("0x0000000000000000000000000000000000000000000000000000000000000000")
            .withIntentAction(new WETH("0x6Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e1").deposit(1))
            .withMaxGasLimit(0)
            .withMaxGasPrice(bn(10).pow(bn(32)))
            .withExpiration(1549218987)
            .build();

        equal(intent.id(wallet), "0x45fe6e30cb8acae1ca41a81420623348d6ee1394da8998c470761c37eea5b528");
    });
    it("Should generate intent id with dependencies", () => {
        const wallet = new Wallet(privs[1]);

        const dependency_signed_intent = wallet.sign(
            new IntentBuilder().withIntentAction(
                new ERC20("0x6Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e1").transfer("0x009ab4de1234c7066197d6ed75743add3576591f", 0)
            ).withExpiration(bn(10).pow(bn(32))).withMaxGasLimit("0").withMaxGasPrice("9999999999").build()
        );

        equal(dependency_signed_intent.id, "0x42dece26ce6cf93b4befdfc80cffa49e8b200e571590ff2af4a27a438e8377ed");

        const intent = new IntentBuilder()
            .withDependencies([dependency_signed_intent])
            .withIntentAction(new ERC20("0x6Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e1").transfer(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                bn(100) * bn(10).pow(bn(18))
            ))
            .withMaxGasLimit("0")
            .withMaxGasPrice("9999999999")
            .withExpiration(bn(10).pow(bn(36)))
            .build();

        equal(intent.build_dependency_call(wallet.config),
            "0x213cf6b20b5cf65ea259393af64935aeecb0ae5eb2b2b7dc42dece26ce6cf93b4befdfc80cffa49e8b200e571590ff2af4a27a438e8377ed"
        )

        equal(intent.build_implementation_call(wallet.config).toLowerCase(),
            "0x00000000000000000000000000000000000000000000000000000000000001000000000000000000000000006Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002540be3ff0000000000000000000000000000000000c097ce7bc90715b34b9f100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000038213cf6b20b5cf65ea259393af64935aeecb0ae5eb2b2b7dc42dece26ce6cf93b4befdfc80cffa49e8b200e571590ff2af4a27a438e8377ed00000000000000000000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000009ab4de1234c7066197d6ed75743add3576591f0000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000".toLowerCase()
        )

        equal(intent.id(wallet), "0x69f9e0539c6d1b349ce4c0c899d3a76f1118dc207e724d196bf9fb1c4fc957f3");
    });
    it("Should sign intent", () => {
        const wallet = new Wallet(privs[1]);
        const intent = new IntentBuilder()
            .withIntentAction(new ERC20("0x6Eb29e4Dffcbe467b755DCBa6fDdfA91F6f747e1").transfer(
                "0x009ab4de1234c7066197d6ed75743add3576591f",
                bn(100) * bn(10).pow(bn(18))
            ))
            .withMaxGasLimit("0")
            .withMaxGasPrice("9999999999")
            .withExpiration(bn(10).pow(bn(36)))
            .build();

        const signedIntent = wallet.sign(intent);

        equal(signedIntent.signature.r, "0x57d3e232917a0e9be2670f57e5694ff445d1b91f9bdc17a85daab98d719b2b14");
        equal(signedIntent.signature.s, "0x2edd48c9f25ee8037bce2ffad51442b83451cbb57f12a7134268a0c1dcca0a40");
        equal(signedIntent.signature.v, 28);

        equal(
            signedIntent.signature.join(),
            "0x57d3e232917a0e9be2670f57e5694ff445d1b91f9bdc17a85daab98d719b2b142edd48c9f25ee8037bce2ffad51442b83451cbb57f12a7134268a0c1dcca0a401c"
        );
    });
  });
});