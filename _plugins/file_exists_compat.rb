# frozen_string_literal: true

# Compatibility shim for gems still calling File.exists? under Ruby 3.2+.
class File
  class << self
    alias_method :exists?, :exist? unless method_defined?(:exists?)
  end
end
