{
  description = "React hook for managing effectful reducers.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-21.11";
    utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          devShell = pkgs.mkShell {
            buildInputs = with pkgs; [
              # Nix LSP + formatter
              rnix-lsp
              nixpkgs-fmt

              # Node.js env
              nodejs-16_x
              yarn
            ];
            shellHook = ''
              # add node_modules/.bin to path
              export PATH="$PWD/node_modules/.bin/:$PATH"
            '';
          };
        }
      );
}
