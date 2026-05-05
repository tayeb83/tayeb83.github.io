# frozen_string_literal: true

# Compatibility shim: File.exists? and Dir.exists? were removed in Ruby 3.2.
File.singleton_class.send(:alias_method, :exists?, :exist?) unless File.respond_to?(:exists?)
Dir.singleton_class.send(:alias_method, :exists?, :exist?) unless Dir.respond_to?(:exists?)
