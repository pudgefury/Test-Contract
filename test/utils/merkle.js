const { solidityKeccak256, solidityPack } = require("ethers/lib/utils");
const MerkleTreeJS = require("merkletreejs").MerkleTree;

const hashLeaf = (leaf) => {
    return solidityKeccak256(
        ["bytes"],
        [solidityPack(["address", "uint256"], [leaf.account, leaf.amount])]
    );
};

class MerkleTree {
    constructor(leaves) {
        this.tree = new MerkleTreeJS(
            leaves.map(leaf => {
                return solidityKeccak256(
                    ["address", "uint256"],
                    [leaf.account, leaf.amount]
                ).replace("0x", "");
            }),
            (data) =>
                solidityKeccak256(
                    ["bytes"],
                    [`0x${data.toString("hex")}`]
                ).replace("0x", ""),
            { sortPairs: true }
        );
    }

    get root() {
        return this.tree.getHexRoot();
    }

    getProof(leaf) {
        return this.tree.getHexProof(hashLeaf(leaf));
    }
}
exports.MerkleTree = MerkleTree;