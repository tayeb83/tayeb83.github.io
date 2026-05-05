File.define_singleton_method(:exists?) { |f| File.exist?(f) } unless File.respond_to?(:exists?)
