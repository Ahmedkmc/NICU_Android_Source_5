{ pkgs, ... }: {
  # Which channel to use.
  channel = "stable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.jdk21
    pkgs.android-tools
  ];

  # Sets environment variables in the workspace
  env = {};

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "ms-android.android-sdk-helper"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # web = {
        #   # Example: run "npm run dev" with PORT set to IDX's defined port for previews
        #   command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
        #   manager = "web";
        # };
        android = {
          # Build the APK when the preview starts
          command = ["./gradlew" "assembleDebug"];
          manager = "android";
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "npm install";
      };
      # Runs when a workspace is (re)started
      onStart = {
        # Example: start a continuous build
        # build-android = "./gradlew assembleDebug";
      };
    };
  };
}
